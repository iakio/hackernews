defmodule HackernewsWeb.PageControllerTest do
  use HackernewsWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Hackernews"
  end
end
