defmodule Hackernews.News.Link do
  use Ecto.Schema
  import Ecto.Changeset
  alias Hackernews.Accounts.User

  schema "links" do
    field :description, :string
    field :url, :string
    belongs_to :posted_by, User

    timestamps()
  end

  @doc false
  def changeset(link, attrs) do
    link
    |> cast(attrs, [:url, :description])
    |> validate_required([:url, :description])
  end
end
