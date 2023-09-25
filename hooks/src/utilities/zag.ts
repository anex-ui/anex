import { createNormalizer } from "@zag-js/types";
import { isObject, isNumber, isString } from "@zag-js/utils";
import hyphenate from "hyphenate-style-name";

type StyleObject = Record<string, string | number>;
type NormalizedAttributesMap = Record<
  string,
  string | number | boolean | undefined | EventListener | Record<string, string>
>;
type TeardownFn = () => void;

export function normalizeCSS(style: StyleObject): StyleObject {
  const css: Record<string, string | number> = {};

  Object.keys(style).forEach((property) => {
    const value = style[property];
    if (!isString(value) && !isNumber(value)) return;
    const normalizedProperty = property.startsWith("--") ? property : hyphenate(property);
    css[normalizedProperty] = value;
  });

  return css;
}

export const normalizeProps = createNormalizer<any>((props: Record<string, string>) => {
  const normalizedProps: Record<string, string | StyleObject> = {};

  Object.entries(props).forEach(([key, value]) => {
    if (key === "style" && isObject(value)) {
      normalizedProps.style = normalizeCSS(value);
      return;
    }
    normalizedProps[key] = value;
  });

  return normalizedProps;
});

export function assignAttributes(
  element: HTMLElement,
  attributesToAssign: NormalizedAttributesMap,
): TeardownFn {
  const attrKeys = Object.keys(attributesToAssign);
  const events = attrKeys.filter((attr) => attr.startsWith("on"));
  const attributes = attrKeys.filter((attr) => !attr.startsWith("on"));

  const setAttributes = (attributeName: string) => {
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
      } else {
        element.setAttribute(attributeName.toLowerCase(), value as string);
      }
      return;
    }

    element.removeAttribute(attributeName.toLowerCase());
  };

  const setup = (eventName: string) =>
    element.addEventListener(
      eventName.substring(2).toLowerCase(),
      attributesToAssign[eventName] as EventListener,
    );
  const teardown = (eventName: string) =>
    element.removeEventListener(
      eventName.substring(2).toLowerCase(),
      attributesToAssign[eventName] as EventListener,
    );

  events.forEach(setup);
  attributes.forEach(setAttributes);

  return function cleanup() {
    events.forEach(teardown);
  };
}
