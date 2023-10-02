defmodule Storybook.Storybook do
  use PhoenixStorybook,
    otp_app: :storybook_web,
    content_path: Path.expand("../../stories", __DIR__),
    css_path: "/assets/storybook.css",
    js_path: "/assets/storybook.js",
    sandbox_class: "storybook-web",
    title: "Anex",
    compilation_mode: :eager
end
