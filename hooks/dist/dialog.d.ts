import { type ViewHook } from "phoenix_live_view";
import * as dialog from "@zag-js/dialog";
interface DialogOptions {
}
export interface DialogViewHook extends ViewHook {
    trigger?: HTMLElement | null;
    backdrop?: HTMLElement | null;
    container?: HTMLElement | null;
    content?: HTMLElement | null;
    options: DialogOptions;
    updateDialog(api: dialog.Api): void;
    teardown?: () => void;
    missingElement: () => boolean;
}
declare const Dialog: DialogViewHook;
export default Dialog;
