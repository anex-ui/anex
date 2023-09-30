import { type ViewHook } from "phoenix_live_view";
import * as menu from "@zag-js/menu";
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
declare const Menu: MenuViewHook;
export default Menu;
