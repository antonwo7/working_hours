import {editCompanyAPIUrl} from "../config";
import {getTokenClientRequest} from "./auth";
import {ICompany} from "../types/companies";

export async function editCompanyServerRequest(companyData: ICompany, callback?: Function | null) {
    const token = getTokenClientRequest()
    if (!token) {
        console.log('Token is empty')
        callback && callback(null)
        return;
    }

    fetch(editCompanyAPIUrl, {
        method: 'POST',
        body: JSON.stringify({ ...companyData }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then(data => data.json()).then(response => {
        callback && callback(response)
    })
}