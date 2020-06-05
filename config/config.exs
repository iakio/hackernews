# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :hackernews,
  ecto_repos: [Hackernews.Repo]

# Configures the endpoint
config :hackernews, HackernewsWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "hP9eeBgh0ujFIqfe1IZb7W5d72TEiiia1/X5lMpAGeU0Du96+geUX0dNQ0DyTULD",
  render_errors: [view: HackernewsWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Hackernews.PubSub,
  live_view: [signing_salt: "rzf9jbXA"]

config :hackernews, Hackernews.Accounts.Guardian,
  issuer: "hackernews",
  secret_key: "FZMS7Dz1GH8wrk/bbF06tgWwYMgqypGb4cbGcB3WGfF/mgnEI6ZgwNI5kCwTlodw"

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
