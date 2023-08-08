import {addUserAPIUrl, editUserAPIUrl, removeUserAPIUrl} from "../config";
import {IAddUserModalState} from "../types/users";
import {getTokenClientRequest} from "./auth";

export async function addUserServerRequest(userData: IAddUserModalState, callback?: Function | null) {
    const token = getTokenClientRequest()
    if (!token) {
        console.log('Token is empty')
        callback && callback(null)
        return;
    }

    fetch(addUserAPIUrl, {
        method: 'POST',
        body: JSON.stringify({ ...userData }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then(data => data.json()).then(response => {
        callback && callback(response)
    })
}

export async function removeUserServerRequest(id: number, callback?: Function | null) {
    const token = getTokenClientRequest()
    if (!token) {
        console.log('Token is empty')
        callback && callback(null)
        return;
    }

    fetch(removeUserAPIUrl, {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then(data => data.json()).then(response => {
        callback && callback(response)
    })
}

export async function editUserServerRequest(userData: IAddUserModalState, callback?: Function | null) {
    const token = getTokenClientRequest()
    if (!token) {
        console.log('Token is empty')
        callback && callback(null)
        return;
    }

    fetch(editUserAPIUrl, {
        method: 'POST',
        body: JSON.stringify({ ...userData }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then(data => data.json()).then(response => {
        callback && callback(response)
    })
}