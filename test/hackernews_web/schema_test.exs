defmodule HackernewsWeb.SchemaTest do
  use HackernewsWeb.ConnCase
  alias Hackernews.Accounts

  test "signup", %{conn: conn} do
    query = """
      mutation SignUp($name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
          user {
            id
          }
          token
        }
      }
    """
    conn = post(conn, "/api", %{
      "query" => query,
      "variables" => %{
        "name" => "user name",
        "email" => "user emal",
        "password" => "user password",
      }
    })

    assert %{"data" => %{"signup" => %{"token" => token, "user" => user}}} = json_response(conn, 200)

    {:ok, claim} = Hackernews.Accounts.Guardian.decode_and_verify(token)
    assert claim["sub"] == user["id"]
  end

  test "login", %{conn: conn} do
    {:ok, user} = Accounts.create_user(%{
      "name" => "user name",
      "email" => "user emal",
      "password" => "user password",
    })

    query = """
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    """
    conn = post(conn, "/api", %{
      "query" => query,
      "variables" => %{
        "email" => "user emal",
        "password" => "user password",
      }
    })
    assert %{"data" => %{"signin" => %{"token" => token}}} = json_response(conn, 200)

    {:ok, claim} = Hackernews.Accounts.Guardian.decode_and_verify(token)
    assert claim["sub"] == Integer.to_string(user.id)

  end
end
