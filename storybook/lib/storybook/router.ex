defmodule Storybook.Router do
  use Phoenix.Router, helpers: false

  import Plug.Conn
  import Phoenix.Controller
  import PhoenixStorybook.Router

  pipeline :browser do
    plug(:accepts, ["html"])
  end

  scope "/" do
    pipe_through(:browser)

    storybook_assets()
    live_storybook("/", backend_module: Storybook.Storybook)
  end
end
