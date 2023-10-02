defmodule Anex.Storybook.MenuStory do
  use PhoenixStorybook.Story, :component

  alias Anex.Components.Menu
  def function, do: &Menu.menu/1
  def imports, do: [{Menu, menu_trigger: 1}, {Menu, menu_content: 1}, {Menu, menu_item: 1}]

  def variations do
    [
      %Variation{
        id: :default,
        slots: [
          """
          <.menu_trigger aria-label="Open the menu to delete something">Open me</.menu_trigger>
          <.menu_content class="w-56 rounded border bg-white py-1">
            <.menu_item class="block w-full px-4 py-2 text-sm text-gray-700">
              Delete Organization
            </.menu_item>
            <.menu_item class="block w-full px-4 py-2 text-sm text-gray-700">
              Delete Account
            </.menu_item>
          </.menu_content>
          """
        ]
      }
    ]
  end
end
