defmodule StorybookWeb.Router do
 use StorybookWeb, :router
  import PhoenixStorybook.Router

  pipeline :browser do
    
    plug :accepts, ["html"]
  end

  scope "/" do
    pipe_through :browser

    storybook_assets()
    live_storybook("/storybook", backend_module: StorybookWeb.Storybook)
  end
end
