defmodule Anex.Components.Menu do
  @moduledoc false

  use Phoenix.Component
  import Anex

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
      "data-menu-options" => assigns.options,
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
      <%= render_as_tag_or_component(assigns, %{"data-menu-part" => "content", "style" => "display: none;"}) %>
    </div>
    """
  end

  attr :as, :any, default: "button"
  attr :rest, :global, include: ["label"]
  slot :inner_block

  def menu_item(assigns) do
    render_as_tag_or_component(assigns, %{"id" => TypeID.new("menu-item"), "data-menu-part" => "item"})
  end

end
