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
    api: menu.Api;
    initialise: () => void;
    teardown?: () => void;
    missingElement: () => boolean;
    updateMenu(api: menu.Api): void;
}
declare const Menu: MenuViewHook;
export default Menu;
