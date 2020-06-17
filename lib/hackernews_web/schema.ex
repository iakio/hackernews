defmodule HackernewsWeb.Schema do
  use Absinthe.Schema

  import Absinthe.Resolution.Helpers

  alias HackernewsWeb.NewsResolver

  def context(ctx) do
    loader =
      Dataloader.new
      |> Dataloader.add_source(User, Hackernews.Accounts.data())
      |> Dataloader.add_source(Vote, Hackernews.News.data())
    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end

  object :vote do
    field :id, non_null(:id)
    field :user, non_null(:user), resolve: dataloader(User)
    field :link, non_null(:link), resolve: dataloader(Vote)
  end

  object :link do
    field :id, non_null(:id)
    field :url, non_null(:string)
    field :description, non_null(:string)
    field :posted_by, :user, resolve: dataloader(User)
    field :votes, non_null(list_of(non_null(:vote))), resolve: dataloader(Vote)
  end

  object :auth_payload do
    field :token, :string
    field :user, :user
  end

  object :user do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :email, non_null(:string)
    field :password, non_null(:string)
    field :links, non_null(list_of(non_null(:link)))
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

    field :signup, type: :auth_payload do
      arg :name, non_null(:string)
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      resolve &NewsResolver.signup/3
    end

    field :login, type: :auth_payload do
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      resolve &NewsResolver.login/3
    end

    field :vote, type: :vote do
      arg :link_id, non_null(:id)
      resolve &NewsResolver.vote/3
    end
  end
end
