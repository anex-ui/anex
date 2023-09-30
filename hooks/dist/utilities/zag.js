"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignAttributes = exports.normalizeProps = exports.normalizeCSS = void 0;
var types_1 = require("@zag-js/types");
var utils_1 = require("@zag-js/utils");
var hyphenate_style_name_1 = __importDefault(require("hyphenate-style-name"));
function normalizeCSS(style) {
    var css = {};
    Object.keys(style).forEach(function (property) {
        var value = style[property];
        if (!(0, utils_1.isString)(value) && !(0, utils_1.isNumber)(value))
            return;
        var normalizedProperty = property.startsWith("--") ? property : (0, hyphenate_style_name_1.default)(property);
        css[normalizedProperty] = value;
    });
    return css;
}
exports.normalizeCSS = normalizeCSS;
exports.normalizeProps = (0, types_1.createNormalizer)(function (props) {
    var normalizedProps = {};
    Object.entries(props).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (key === "style" && (0, utils_1.isObject)(value)) {
            normalizedProps.style = normalizeCSS(value);
            return;
        }
        normalizedProps[key] = value;
    });
    return normalizedProps;
});
function assignAttributes(element, attributesToAssign) {
    var attrKeys = Object.keys(attributesToAssign);
    var events = attrKeys.filter(function (attr) { return attr.startsWith("on"); });
    var attributes = attrKeys.filter(function (attr) { return !attr.startsWith("on"); });
    var setAttributes = function (attributeName) {
        var value = attributesToAssign[attributeName];
        if (typeof value === "boolean") {
            value = value || undefined;
        }
        if (value != null) {
            if (attributeName === "style" && (0, utils_1.isObject)(value)) {
                Object.entries(value).forEach(function (_a) {
                    var styleAttributeName = _a[0], styleAttributeValue = _a[1];
                    // @ts-ignore
                    element.style[styleAttributeName] = styleAttributeValue;
                });
            }
            else {
                element.setAttribute(attributeName.toLowerCase(), value);
            }
            return;
        }
        element.removeAttribute(attributeName.toLowerCase());
    };
    var setup = function (eventName) {
        return element.addEventListener(eventName.substring(2).toLowerCase(), attributesToAssign[eventName]);
    };
    var teardown = function (eventName) {
        return element.removeEventListener(eventName.substring(2).toLowerCase(), attributesToAssign[eventName]);
    };
    events.forEach(setup);
    attributes.forEach(setAttributes);
    return function cleanup() {
        events.forEach(teardown);
    };
}
exports.assignAttributes = assignAttributes;
