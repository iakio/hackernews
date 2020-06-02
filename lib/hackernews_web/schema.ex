defmodule HackernewsWeb.Schema do
  use Absinthe.Schema

  alias HackernewsWeb.NewsResolver

  object :link do
    field :id, non_null(:id)
    field :url, non_null(:string)
    field :description, non_null(:string)
  end

  object :feed do
    field :links, non_null(list_of(non_null(:link)))
  end

  query do
    field :feed, :feed do
      resolve &NewsResolver.feed/3
    end
  end

  mutation do
    field :post, type: :link do
      arg :url, non_null(:string)
      arg :description, non_null(:string)
      resolve &NewsResolver.create_link/3
    end
  end
end
