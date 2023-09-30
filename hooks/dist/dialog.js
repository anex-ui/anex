"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dialog = __importStar(require("@zag-js/dialog"));
var zag_1 = require("./utilities/zag");
var Dialog = {
    mounted: function () {
        var _this = this;
        var _a;
        this.trigger = this.el.querySelector("[data-dialog-part='trigger']");
        this.backdrop = this.el.querySelector("[data-dialog-part='backdrop']");
        this.container = this.el.querySelector("[data-dialog-part='container']");
        this.content = this.el.querySelector("[data-dialog-part='content']");
        if (this.missingElement()) {
            return;
        }
        this.backdrop.style.display = "";
        this.container.style.display = "";
        var optionsString = (_a = this.el.dataset.dialogOptions) !== null && _a !== void 0 ? _a : "{}";
        this.options = JSON.parse(optionsString);
        var id = this.el.id;
        var service = dialog.machine({ id: id });
        service.subscribe(function (state) {
            var api = dialog.connect(state, service.send, zag_1.normalizeProps);
            _this.updateDialog(api);
        });
        service.start().send("SETUP");
    },
    beforeDestroy: function () {
        if (this.teardown)
            this.teardown();
    },
    updateDialog: function (api) {
        if (this.missingElement()) {
            return;
        }
        if (this.teardown)
            this.teardown();
        var teardownFns = [
            (0, zag_1.assignAttributes)(this.trigger, api.triggerProps),
            (0, zag_1.assignAttributes)(this.backdrop, api.backdropProps),
            (0, zag_1.assignAttributes)(this.container, api.containerProps),
            (0, zag_1.assignAttributes)(this.content, api.contentProps),
        ];
        this.teardown = function () {
            teardownFns.forEach(function (fn) { return fn(); });
        };
    },
    missingElement: function () {
        var missingElement = !this.trigger || !this.backdrop || !this.container || !this.content;
        if (missingElement) {
            console.error("Dialog is missing a required element");
        }
        return missingElement;
    },
};
exports.default = Dialog;
