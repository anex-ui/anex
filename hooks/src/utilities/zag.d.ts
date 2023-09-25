type StyleObject = Record<string, string | number>;
type NormalizedAttributesMap = Record<string, string | number | boolean | undefined | EventListener | Record<string, string>>;
type TeardownFn = () => void;
export declare function normalizeCSS(style: StyleObject): StyleObject;
export declare const normalizeProps: import("@zag-js/types").NormalizeProps<any>;
export declare function assignAttributes(element: HTMLElement, attributesToAssign: NormalizedAttributesMap): TeardownFn;
export {};
