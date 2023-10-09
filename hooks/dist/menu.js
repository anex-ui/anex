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
var menu = __importStar(require("@zag-js/menu"));
var zag_1 = require("./utilities/zag");
var Menu = {
    mounted: function () {
        this.initialise();
    },
    updated: function () {
        this.initialise();
    },
    beforeUpdate: function () {
        if (this.teardown)
            this.teardown();
    },
    beforeDestroy: function () {
        if (this.teardown)
            this.teardown();
    },
    initialise: function () {
        var _this = this;
        var _a;
        this.trigger = this.el.querySelector("[data-menu-part='trigger']");
        this.positioner = this.el.querySelector("[data-menu-part='positioner']");
        this.content = this.el.querySelector("[data-menu-part='content']");
        this.items = this.el.querySelectorAll("[data-menu-part='item']");
        if (this.missingElement()) {
            return;
        }
        this.positioner.style.display = "";
        var optionsString = (_a = this.el.dataset.menuOptions) !== null && _a !== void 0 ? _a : "{}";
        this.options = JSON.parse(optionsString);
        var id = this.el.id;
        var service = menu.machine({ id: id });
        service.subscribe(function (state) {
            _this.api = menu.connect(state, service.send, zag_1.normalizeProps);
            _this.updateMenu(_this.api);
        });
        service.start().send("SETUP");
    },
    missingElement: function () {
        var missingElement = !this.trigger || !this.positioner || !this.content || !this.items;
        if (missingElement) {
            console.error("Menu is missing a required element");
        }
        return missingElement;
    },
    updateMenu: function (api) {
        var _this = this;
        if (this.missingElement()) {
            return;
        }
        if (this.teardown)
            this.teardown();
        var teardownFns = [
            (0, zag_1.assignAttributes)(this.trigger, api.triggerProps),
            (0, zag_1.assignAttributes)(this.positioner, api.positionerProps),
            (0, zag_1.assignAttributes)(this.content, api.contentProps),
        ];
        this.items.forEach(function (item) {
            var id = item.id;
            if (id === api.highlightedId) {
                _this.options.activeItemClass && item.classList.add(_this.options.activeItemClass);
            }
            else {
                _this.options.activeItemClass && item.classList.remove(_this.options.activeItemClass);
            }
            teardownFns.push((0, zag_1.assignAttributes)(item, api.getItemProps({ id: id })));
        });
        this.teardown = function () {
            teardownFns.forEach(function (fn) { return fn(); });
        };
    },
};
exports.default = Menu;
