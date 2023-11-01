import Config

config :storybook, Storybook.Endpoint,
  url: [host: "localhost"],
  server: true,
  render_errors: [
    formats: [json: Storybook.ErrorJSON],
    layout: false
  ],
  live_view: [signing_salt: "44IaZDZl"]

config :esbuild,
  version: "0.17.11",
  default: [
    args:
      ~w(js/storybook.js --bundle --target=es2017 --outdir=../priv/static/assets --external:/fonts/* --external:/images/*),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ]

config :tailwind,
  version: "3.3.2",
  storybook: [
    args: ~w(
          --config=tailwind.config.js
          --input=css/storybook.css
          --output=../priv/static/assets/storybook.css
        ),
    cd: Path.expand("../assets", __DIR__)
  ]

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :phoenix, :json_library, Jason

import_config "#{config_env()}.exs"
