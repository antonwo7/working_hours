import {generateReportAPIUrl} from "../config";
import {getTokenClientRequest} from "./auth";

export function asyncFunction(callback: Function, timeout?: number) {
    setTimeout(callback, timeout ?? 0)
}
export function notEmptyArray(array: any) {
    return Array.isArray(array) && array.length > 0
}
export function notEmptyObjectProp(value: string, object: any, defaultValue: any = null) {
    return value in object && !!object[value] ? object[value] : defaultValue
}
export function fileDownload(url: string, filename: string = basename(url)){
    let link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    link.download = filename
    link.dispatchEvent(new MouseEvent('click'))
}
function basename(path: string) {
    return path.split('/').reverse()[0];
}

export async function generateReportServerRequest(months: Array<number>, userId: number, callback?: Function) {
    const token = getTokenClientRequest()
    if (!token){
        return false
    }

    fetch(generateReportAPIUrl, {
        method: 'POST',
        body: JSON.stringify({ months, user_id: userId }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(data => data.json())
        .then(response => {
            callback && callback(response)
        })
}