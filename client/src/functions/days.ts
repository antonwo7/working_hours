import {addDayAPIUrl, removeDayAPIUrl} from "../config";
import {getTokenClientRequest} from "./auth";
import {IDay} from "../types/days";
const date = require('date-and-time')

export function dateFormat(dateValue: Date) {
    return date.format(dateValue, 'DD-MM-YYYY')
}

export function getMonthNameList() {
    const months = []
    for (let i = 1; i <= 12; i++) {
        months.push(getMonthName(i))
    }

    return months
}

function getMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', { month: 'long' });
}

function isWeekend(date: Date) {
    const day = date.getDay()
    return (day === 6 || day === 0)
}

function getMonthLastDay(month: number): Date {
    const date = new Date()
    return new Date(date.getFullYear(), month + 1, 0)
}

function getMonthFirstDay(month: number): Date {
    const date = new Date()
    return new Date(date.getFullYear(), month, 1)
}

export function getDates(month: number): Array<{ date: string, weekend: boolean }> {
    const dates: Array<{ date: string, weekend: boolean }> = []
    const firstDate = getMonthFirstDay(month)
    const lastDate = getMonthLastDay(month)

    while (firstDate <= lastDate) {
        dates.push({ date: dateFormat(firstDate), weekend: isWeekend(firstDate) })
        firstDate.setDate(firstDate.getDate() + 1)
    }

    return dates
}

export async function addDayServerRequest(day: string, callback?: Function | null) {
    const token = getTokenClientRequest()
    if (!token) {
        console.log('Token is empty')
        callback && callback(null)
        return;
    }

    fetch(addDayAPIUrl, {
        method: 'POST',
        body: JSON.stringify({ day }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then(data => data.json()).then(response => {
        callback && callback(response)
    })
}

export async function removeDayServerRequest(id: number, callback?: Function | null) {
    const token = getTokenClientRequest()
    if (!token) {
        console.log('Token is empty')
        callback && callback(null)
        return;
    }

    fetch(removeDayAPIUrl, {
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