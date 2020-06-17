defmodule HackernewsWeb.NewsResolver do
  alias Hackernews.News
  alias Hackernews.Accounts
  alias Hackernews.Accounts.Guardian
  require Logger

  def feed(_root, _args, _info) do
    links = News.list_links()
    {:ok, %{links: links}}
  end

  def posted_by(%{posted_by: id}, _args, _info) do
    if id == nil do
      {:ok, nil}
    else
      {:ok, Accounts.get_user!(id)}
    end
  end

  def create_link(_root, args, %{context: %{current_user: %{id: id}}}) do
    News.create_link(Map.put(args, :posted_by_id, id))
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

  def vote(_root, %{link_id: link_id}, %{context: %{current_user: %{id: user_id}}}) do
    if News.vote_exists!(link_id, user_id) do
      {:error, "Already voted"}
    else
      News.create_vote(%{link_id: link_id, user_id: user_id})
    end
  end
end
