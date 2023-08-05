import {IUsersSetUsersAction, IUsersState, TUsersAction} from "../types/users";
import { EUsersActionTypes } from "./types";
import {TCommonAction} from "../types/common";
import {notEmptyArray} from "../functions/common";

const initialState: IUsersState = {
    userList: []
}

export default function users(state: IUsersState = initialState, action: TUsersAction) {

    switch (action.type) {

        case EUsersActionTypes.USERS__SET_USERS: {
            if (!('users' in action) || !Array.isArray(action.users)) return state

            return {...state, userList: action.users};
        }

        case EUsersActionTypes.USERS__ADD_USER: {
            if (!('user' in action) || !action.user) return state

            return {...state, userList: [ ...state.userList, action.user ]};
        }

        case EUsersActionTypes.USERS__REMOVE_USER: {
            if (!('userId' in action) || !action.userId) return state

            const users = state.userList.filter(user => user.id !== action.userId)
            return {...state, userList: users};
        }

        default:
            return state;
    }
}