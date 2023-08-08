import {EDaysActionTypes} from "../reducers/types";
import {IDay, TDaysAction} from "../types/days";

export function loadDaysAction(days: Array<IDay>, callback?: Function): TDaysAction {

    return {
        type: EDaysActionTypes.DAYS__SET_DAYS,
        days,
        callback
    }
}
export function setDaysAction(days: Array<IDay>, callback?: Function): TDaysAction {
    return {
        type: EDaysActionTypes.DAYS__SET_DAYS,
        days,
        callback
    }
}
export function addDayAction(day: string, callback?: Function): TDaysAction {
    return {
        type: EDaysActionTypes.DAYS__ADD_DAY,
        day,
        callback
    }
}
export function removeDayAction(dayId: number, callback?: Function): TDaysAction {
    return {
        type: EDaysActionTypes.DAYS__REMOVE_DAY,
        dayId,
        callback
    }
}