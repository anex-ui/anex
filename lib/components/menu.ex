defmodule HeadlessBird.Components.Menu do
  @moduledoc false

  use Phoenix.Component

  attr :active_item_class, :string, default: nil, doc: "Class to apply to the currently focused item"
  attr :class, :string, default: nil, doc: "Extra classes"
  attr :as, :any, default: "div"
  attr :rest, :global
  slot :inner_block

  def menu(assigns) do
    options = Jason.encode!(%{activeItemClass: assigns.active_item_class})
    assigns = assign(assigns, options: options)

    render_as_tag_or_component(assigns, %{
      "id" => TypeID.new("menu"),
      "phx-hook" => "Menu",
      "data-menu-options" => assigns.options
    })
  end

  attr :as, :any, default: "button"
  attr :rest, :global, include: ["label"]
  slot :inner_block

  def menu_trigger(assigns) do
    render_as_tag_or_component(assigns, %{"data-menu-part" => "trigger"})
  end

  attr :as, :any, default: "div"
  attr :rest, :global, include: ["label"]
  slot :inner_block

  def menu_content(assigns) do
    ~H"""
    <div data-menu-part="positioner">
      <%= render_as_tag_or_component(assigns, %{"data-menu-part" => "content"}) %>
    </div>
    """
  end

  attr :as, :any, default: "button"
  attr :rest, :global, include: ["label"]
  slot :inner_block

  def menu_item(assigns) do
    render_as_tag_or_component(assigns, %{"id" => TypeID.new("menu-item"), "data-menu-part" => "item"})
  end

  defp render_as_tag_or_component(assigns, extra_assigns) do
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
