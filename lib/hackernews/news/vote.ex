defmodule Hackernews.News.Vote do
  use Ecto.Schema
  import Ecto.Changeset
  alias Hackernews.News.Link
  alias Hackernews.Accounts.User

  schema "votes" do
    belongs_to :link, Link
    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(vote, attrs) do
    vote
    |> cast(attrs, [:user_id, :link_id])
    |> validate_required([:user_id, :link_id])
  end
end
