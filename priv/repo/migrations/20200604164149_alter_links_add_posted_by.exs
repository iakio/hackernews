defmodule Hackernews.Repo.Migrations.AlterLinksAddPostedBy do
  use Ecto.Migration

  def change do
    alter table(:links) do
      add :posted_by_id, :id
    end
  end
end
