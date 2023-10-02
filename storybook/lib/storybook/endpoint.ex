defmodule Storybook.Endpoint do
  use Phoenix.Endpoint, otp_app: :storybook

  @session_options [
    store: :cookie,
    key: "_storybook_key",
    signing_salt: "98shfJDG",
    same_site: "Lax"
  ]

  socket "/live", Phoenix.LiveView.Socket, websocket: [connect_info: [session: @session_options]]

  plug Plug.Static,
    at: "/",
    from: :storybook,
    gzip: false,
    only: ~w(assets fonts images favicon.ico robots.txt)

  if code_reloading? do
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId

  plug Plug.MethodOverride
  plug Plug.Head
  plug Plug.Session, @session_options
  plug Storybook.Router
end
