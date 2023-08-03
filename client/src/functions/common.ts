export function asyncFunction(callback: Function, timeout?: number) {
    setTimeout(callback, timeout ?? 0)
}