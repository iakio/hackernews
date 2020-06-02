defmodule HackernewsWeb.NewsResolver do
  def feed(_root, _args, _info) do
    links = Hackernews.News.list_links()
    {:ok, %{links: links}}
  end
end
