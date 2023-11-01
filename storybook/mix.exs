defmodule Storybook.MixProject do
  use Mix.Project

  def project do
    [
      app: :storybook,
      version: "0.1.0",
      elixir: "~> 1.14",
      elixirc_paths: ["lib"],
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  def application do
    [
      mod: {Storybook.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  defp deps do
    [
      {:anex, github: "anex-ui/anex", branch: "dialog"},
      {:phoenix, "~> 1.7.7"},
      {:phoenix_html, "3.3.2"},
      {:phoenix_live_view, "0.20.0"},
      {:phoenix_storybook, "~> 0.5.0"},
      {:esbuild, "~> 0.7", runtime: Mix.env() == :dev},
      {:tailwind, "~> 0.2.0", runtime: Mix.env() == :dev},
      {:plug_cowboy, "~> 2.5"},
      {:jason, "1.4.1"}
    ]
  end

  defp aliases do
    [
      setup: ["deps.get", "assets.setup", "assets.build"],
      "assets.setup": ["tailwind.install --if-missing", "esbuild.install --if-missing"],
      "assets.build": ["tailwind default", "esbuild default"],
      "assets.deploy": ["tailwind storybook --minify", "esbuild default --minify", "phx.digest"]
    ]
  end
end
