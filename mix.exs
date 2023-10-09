defmodule Headlessbird.MixProject do
  use Mix.Project

  def project do
    [
      app: :anex,
      version: "0.1.0",
      elixir: "~> 1.15",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:phoenix, "1.7.7"},
      {:phoenix_html, "3.3.2"},
      {:phoenix_live_view, "0.20.0"},
      {:jason, "1.4.1"},
      {:typeid_elixir, "0.5.1"},
      # FIXME: To make typeid compile 
      {:ecto, "3.10.3"},
    ]
  end
end
