defmodule Hackernews.News.Link do
  use Ecto.Schema
  import Ecto.Changeset
  alias Hackernews.Accounts.User
  alias Hackernews.News.Vote

  schema "links" do
    field :description, :string
    field :url, :string
    belongs_to :posted_by, User
    has_many :votes, Vote

    timestamps()
  end

  @doc false
  def changeset(link, attrs) do
    link
    |> cast(attrs, [:url, :description, :posted_by_id])
    |> validate_required([:url, :description])
  end
end
