// Type definitions for @ag-grid-community/core v23.1.1
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
export declare function iterateObject<T>(object: {
    [p: string]: T;
} | T[] | undefined, callback: (key: string, value: T) => void): void;
export declare function cloneObject<T>(object: T): T;
export declare function deepCloneObject<T>(object: T): T;
export declare function getProperty<T, K extends keyof T>(object: T, key: K): any;
export declare function setProperty<T, K extends keyof T>(object: T, key: K, value: any): void;
/**
 * Will copy the specified properties from `source` into the equivalent properties on `target`, ignoring properties with
 * a value of `undefined`.
 */
export declare function copyPropertiesIfPresent<S, T extends S, K extends keyof S>(source: S, target: T, ...properties: K[]): void;
/**
 * Will copy the specified property from `source` into the equivalent property on `target`, unless the property has a
 * value of `undefined`. If a transformation is provided, it will be applied to the value before being set on `target`.
 */
export declare function copyPropertyIfPresent<S, T extends S, K extends keyof S>(source: S, target: T, property: K, transform?: (value: S[K]) => any): void;
export declare function getAllKeysInObjects(objects: any[]): string[];
export declare function mergeDeep(dest: any, source: any, copyUndefined?: boolean): void;
export declare function assign(object: any, ...sources: any[]): any;
export declare function missingOrEmptyObject(value: any): boolean;
export declare function get(source: any, expression: string, defaultValue: any): any;
export declare function set(target: any, expression: string, value: any): void;
export declare function deepFreeze(object: any): any;
export declare function getValueUsingField(data: any, field: string, fieldContainsDots: boolean): any;