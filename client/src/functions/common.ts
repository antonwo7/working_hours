export function asyncFunction(callback: Function, timeout?: number) {
    setTimeout(callback, timeout ?? 0)
}
export function notEmptyArray(array: any) {
    return Array.isArray(array) && array.length > 0
}
export function notEmptyObjectProp(value: string, object: any, defaultValue: any = null) {
    return value in object && !!object[value] ? object[value] : defaultValue
}