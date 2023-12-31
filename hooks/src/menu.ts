import { type ViewHook } from "phoenix_live_view";
import * as menu from "@zag-js/menu";
import { normalizeProps, assignAttributes } from "./utilities/zag";

interface MenuOptions {
  activeItemClass?: string;
}

export interface MenuViewHook extends ViewHook {
  trigger?: HTMLElement | null;
  positioner?: HTMLElement | null;
  content?: HTMLElement | null;
  items?: NodeListOf<HTMLElement>;
  options: MenuOptions;
  updateMenu(api: menu.Api): void;
  teardown?: () => void;
  missingElement: () => boolean;
}

const Menu = {
  mounted() {
    this.trigger = this.el.querySelector("[data-menu-part='trigger']");
    this.positioner = this.el.querySelector("[data-menu-part='positioner']");
    this.content = this.el.querySelector("[data-menu-part='content']");
    this.items = this.el.querySelectorAll("[data-menu-part='item']");

    if (this.missingElement()) {
      return;
    }
    this.content!.style.display = "";

    const optionsString = this.el.dataset.menuOptions ?? "{}";
    this.options = JSON.parse(optionsString) as MenuOptions;

    const id = this.el.id;
    const service = menu.machine({ id });
    service.subscribe((state) => {
      const api = menu.connect(state, service.send, normalizeProps);
      this.updateMenu(api);
    });
    service.start().send("SETUP");
  },
  beforeDestroy() {
    if (this.teardown) this.teardown();
  },
  updateMenu(api) {
    if (this.missingElement()) {
      return;
    }

    if (this.teardown) this.teardown();
    const teardownFns = [
      assignAttributes(this.trigger!, api.triggerProps),
      assignAttributes(this.positioner!, api.positionerProps),
      assignAttributes(this.content!, api.contentProps),
    ];

    this.items!.forEach((item: HTMLElement) => {
      const id = item.id;

      if (id === api.highlightedId) {
        this.options.activeItemClass && item.classList.add(this.options.activeItemClass);
      } else {
        this.options.activeItemClass && item.classList.remove(this.options.activeItemClass);
      }

      teardownFns.push(assignAttributes(item, api.getItemProps({ id })));
    });

    this.teardown = () => {
      teardownFns.forEach((fn) => fn());
    };
  },
  missingElement() {
    const missingElement = !this.trigger || !this.positioner || !this.content || !this.items;
    if (missingElement) {
      console.error("Menu is missing a required element");
    }

    return missingElement;
  },
} as MenuViewHook;

export default Menu;
