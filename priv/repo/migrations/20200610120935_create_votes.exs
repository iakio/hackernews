defmodule Hackernews.Repo.Migrations.CreateVotes do
  use Ecto.Migration

  def change do
    create table(:votes) do
      add :user_id, :id
      add :link_id, :id

      timestamps()
    end

  end
end
