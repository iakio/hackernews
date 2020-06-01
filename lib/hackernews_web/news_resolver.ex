defmodule HackernewsWeb.NewsResolver do

  def all_links(_root, _args, _info) do
    links = Hackernews.News.list_links()
    {:ok, links}
  end
end
