import { loginAPIUrl, tokenValidationAPIUrl } from "../config";

export function isAuthClientRequest() {
    const token = localStorage.getItem('token')
}

export async function isTokenValidServerRequest(): Promise<boolean> {
    const token = getTokenClientRequest()

    if (!token){
        return false
    }

    const response = await fetch(tokenValidationAPIUrl, {
        method: 'POST',
        body: JSON.stringify({
            token: token
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())

    return !!response.result
}

export function saveTokenClientRequest(token: string) {
    localStorage.setItem('token', token)
}

export function getTokenClientRequest(): string | null {
    return localStorage.getItem('token')
}

export function removeTokenClientRequest() {
    localStorage.removeItem('token')
}

export async function loginServerRequest(username: string, password: string, callback?: Function | null): Promise<boolean>{
    fetch(loginAPIUrl, {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(data => data.json()).then(response => {
        callback && callback(response)
    })

    return false
}

export async function authCheckServerRequest(token: string, callback: Function) {
    fetch(tokenValidationAPIUrl, {
        method: 'POST',
        body: JSON.stringify({
            token: token
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
        .then(response => {
            callback && callback(response)
        })
}