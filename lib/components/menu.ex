defmodule Anex.Components.Menu do
  @moduledoc false

  use Phoenix.Component
  import Anex

  attr :id, :string, required: true
  attr :as, :any, default: "div"
  attr :"active-item-class", :string, default: nil, doc: "Class to apply to the currently focused item"
  attr :position, :string, default: nil
  attr :class, :string, default: nil, doc: "Extra classes"
  attr :rest, :global
  slot :inner_block

  def menu(assigns) do
    options = Jason.encode!(%{activeItemClass: Map.get(assigns, :"active-item-class"), position:
    Map.get(assigns, :position)})
    assigns = assign(assigns, options: options)

    render_as_tag_or_component(assigns, %{
      "id" => assigns.id,
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
    <div data-menu-part="positioner" style="display: none;">
      <%= render_as_tag_or_component(assigns, %{"data-menu-part" => "content"}) %>
    </div>
    """
  end

  attr :id, :string, required: true
  attr :as, :any, default: "button"
  attr :rest, :global, include: ["label"]
  slot :inner_block

  def menu_item(assigns) do
    render_as_tag_or_component(assigns, %{"id" => assigns.id, "data-menu-part" => "item"})
  end
end
