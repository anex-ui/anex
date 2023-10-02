defmodule Anex.Storybook.MenuStory do
  use PhoenixStorybook.Story, :component

  alias Anex.Components.Menu
  def function, do: &Menu.menu/1
  def imports, do: [{Menu, menu_trigger: 1}, {Menu, menu_content: 1}, {Menu, menu_item: 1}]

  def variations do
    [
      %Variation{
        id: :default_modal,
        slots: [""]
      }
    ]
  end
end
