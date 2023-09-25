import { createNormalizer } from "@zag-js/types";
import { isObject, isNumber, isString } from "@zag-js/utils";
import hyphenate from "hyphenate-style-name";
export function normalizeCSS(style) {
    const css = {};
    Object.keys(style).forEach((property) => {
        const value = style[property];
        if (!isString(value) && !isNumber(value))
            return;
        const normalizedProperty = property.startsWith("--") ? property : hyphenate(property);
        css[normalizedProperty] = value;
    });
    return css;
}
export const normalizeProps = createNormalizer((props) => {
    const normalizedProps = {};
    Object.entries(props).forEach(([key, value]) => {
        if (key === "style" && isObject(value)) {
            normalizedProps.style = normalizeCSS(value);
            return;
        }
        normalizedProps[key] = value;
    });
    return normalizedProps;
});
export function assignAttributes(element, attributesToAssign) {
    const attrKeys = Object.keys(attributesToAssign);
    const events = attrKeys.filter((attr) => attr.startsWith("on"));
    const attributes = attrKeys.filter((attr) => !attr.startsWith("on"));
    const setAttributes = (attributeName) => {
        let value = attributesToAssign[attributeName];
        if (typeof value === "boolean") {
            value = value || undefined;
        }
        if (value != null) {
            if (attributeName === "style" && isObject(value)) {
                Object.entries(value).forEach(([styleAttributeName, styleAttributeValue]) => {
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
    const setup = (eventName) => element.addEventListener(eventName.substring(2).toLowerCase(), attributesToAssign[eventName]);
    const teardown = (eventName) => element.removeEventListener(eventName.substring(2).toLowerCase(), attributesToAssign[eventName]);
    events.forEach(setup);
    attributes.forEach(setAttributes);
    return function cleanup() {
        events.forEach(teardown);
    };
}
