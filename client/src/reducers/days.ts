import {EDaysActionTypes} from "./types";
import store from "./index";
import * as daysActions from "../actions/days";
import {IDay, IDaysState, TDaysAction} from "../types/days";
import {addDayServerRequest, removeDayServerRequest} from "../functions/days";

const initialState: IDaysState = {
    dayList: []
}

export default function days(state: IDaysState = initialState, action: TDaysAction) {

    switch (action.type) {

        case EDaysActionTypes.DAYS__SET_DAYS: {
            if (!('days' in action) || !Array.isArray(action.days)) return state

            return {...state, dayList: action.days}
        }

        case EDaysActionTypes.DAYS__ADD_DAY: {
            if (!('day' in action) || !action.day) return state

            addDayServerRequest(action.day, (response: { result: boolean, days: Array<IDay> }) => {
                store.dispatch(daysActions.setDaysAction(response.days))
            })

            action.callback && action.callback()

            return state
        }

        case EDaysActionTypes.DAYS__REMOVE_DAY: {
            if (!('dayId' in action) || !action.dayId) return state

            removeDayServerRequest(action.dayId, (response: { result: boolean, days: Array<IDay> }) => {
                store.dispatch(daysActions.setDaysAction(response.days))
            })

            action.callback && action.callback()

            return state
        }

        default:
            return state;
    }
}