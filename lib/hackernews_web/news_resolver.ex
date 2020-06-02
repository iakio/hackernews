defmodule HackernewsWeb.NewsResolver do
  alias Hackernews.News
  def feed(_root, _args, _info) do
    links = News.list_links()
    {:ok, %{links: links}}
  end

  def create_link(_root, args, _info) do
    News.create_link(args)
  end
end
