import { type ViewHook } from "phoenix_live_view";
import * as dialog from "@zag-js/dialog";
import { normalizeProps, assignAttributes } from "./utilities/zag";

interface DialogOptions { }

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

const Dialog = {
  mounted() {
    this.trigger = this.el.querySelector("[data-dialog-part='trigger']");
    this.backdrop = this.el.querySelector("[data-dialog-part='backdrop']");
    this.container = this.el.querySelector("[data-dialog-part='container']");
    this.content = this.el.querySelector("[data-dialog-part='content']");

    if (this.missingElement()) {
      return;
    }
    this.backdrop!.style.display = "";
    this.container!.style.display = "";

    const optionsString = this.el.dataset.dialogOptions ?? "{}";
    this.options = JSON.parse(optionsString) as DialogOptions;

    const id = this.el.id;
    const service = dialog.machine({ id });
    service.subscribe((state) => {
      const api = dialog.connect(state, service.send, normalizeProps);
      this.updateDialog(api);
    });
    service.start().send("SETUP");
  },
  beforeDestroy() {
    if (this.teardown) this.teardown();
  },
  updateDialog(api) {
    if (this.missingElement()) {
      return;
    }

    if (this.teardown) this.teardown();
    const teardownFns = [
      assignAttributes(this.trigger!, api.triggerProps),
      assignAttributes(this.backdrop!, api.backdropProps),
      assignAttributes(this.container!, api.containerProps),
      assignAttributes(this.content!, api.contentProps),
    ];

    this.teardown = () => {
      teardownFns.forEach((fn) => fn());
    };
  },
  missingElement() {
    const missingElement = !this.trigger || !this.backdrop || !this.container || !this.content;
    if (missingElement) {
      console.error("Dialog is missing a required element");
    }

    return missingElement;
  },
} as DialogViewHook;

export default Dialog;
