defmodule Storybook.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      Storybook.Endpoint
    ]

    opts = [strategy: :one_for_one, name: Storybook.Supervisor]
    Supervisor.start_link(children, opts)
  end

  @impl true
  def config_change(changed, _new, removed) do
    Storybook.Endpoint.config_change(changed, removed)
    :ok
  end
end