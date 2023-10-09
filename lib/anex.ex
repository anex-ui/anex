defmodule Anex do
import Phoenix.Component
  def render_as_tag_or_component(assigns, extra_assigns) do
    assigns =
      assigns
      |> Map.get(:rest, %{})
      |> Enum.reduce(assigns, fn {k, v}, acc -> assign(acc, k, v) end)
      |> Map.delete(:rest)
      |> Map.merge(extra_assigns)

    ~H"""
    <%= if is_function(@as) do %>
      <%= Phoenix.LiveView.TagEngine.component(
        @as,
        Map.delete(assigns, :as),
        {__ENV__.module, __ENV__.function, __ENV__.file, __ENV__.line}
      ) %>
    <% end %>

    <%= if is_binary(@as) do %>
      <.dynamic_tag name={@as} {Map.delete(assigns, :as)} />
    <% end %>
    """
  end
end
