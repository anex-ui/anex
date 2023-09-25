defmodule HeadlessbirdTest do
  use ExUnit.Case
  doctest Headlessbird

  test "greets the world" do
    assert Headlessbird.hello() == :world
  end
end
