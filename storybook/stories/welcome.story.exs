defmodule Storybook.MyPage do
  use PhoenixStorybook.Story, :page

  def render(assigns) do
    ~H"""
     Hello :) 
    """
  end
end
