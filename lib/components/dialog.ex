defmodule Anex.Components.Dialog do
  @moduledoc false

  use Phoenix.Component
  import Anex

  attr :class, :string, default: nil, doc: "Extra classes"
  attr :as, :any, default: "div"
  attr :rest, :global
  slot :inner_block

  def dialog(assigns) do
    render_as_tag_or_component(assigns, %{
      "id" => to_string(TypeID.new("dialog")),
      "phx-hook" => "Dialog"
    })
  end

  attr :as, :any, default: "button"
  attr :rest, :global, include: ["label"]
  slot :inner_block

  def dialog_trigger(assigns) do
    render_as_tag_or_component(assigns, %{"data-dialog-part" => "trigger"})
  end

  attr :as, :any, default: "div"
  attr :rest, :global
  slot :inner_block

  def dialog_backdrop(assigns) do
    render_as_tag_or_component(assigns, %{"data-dialog-part" => "backdrop", "style" => "display: none;" })
  end

  attr :as, :any, default: "div"
  attr :rest, :global
  slot :inner_block

  def dialog_container(assigns) do
    render_as_tag_or_component(assigns, %{"data-dialog-part" => "container", "style" => "display: none;" })
  end

  attr :as, :any, default: "div"
  attr :rest, :global
  slot :inner_block

  def dialog_content(assigns) do
    render_as_tag_or_component(assigns, %{"data-dialog-part" => "content"})
  end
end
