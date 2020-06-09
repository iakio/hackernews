defmodule HackernewsWeb.NewsResolver do
  alias Hackernews.News
  alias Hackernews.Accounts
  alias Hackernews.Accounts.Guardian
  def feed(_root, _args, _info) do
    links = News.list_links()
    {:ok, %{links: links}}
  end

  def create_link(_root, args, %{context: %{current_user: %{id: id}}}) do
    News.create_link(Map.put(args, :posted_by, %{id: id}))
  end

  def signup(_root, args, _info) do
    with {:ok, user} <- Accounts.create_user(args),
      {:ok, token, _claim} <- Guardian.encode_and_sign(user) do
      {:ok, %{token: token, user: user}}
    end
  end

  def login(_root, %{email: email, password: password}, _info) do
    user = Accounts.get_user_by_email!(email)
    if Argon2.verify_pass(password, user.password) do
      {:ok, token, _claim} = Guardian.encode_and_sign(user)
      {:ok, %{token: token, user: user}}
    end
  end
end
