import {IUser, IUsersSetUsersAction, IUsersState, TUsersAction} from "../types/users";
import { EUsersActionTypes } from "./types";
import {TCommonAction} from "../types/common";
import {notEmptyArray} from "../functions/common";
import {addUserServerRequest, editUserServerRequest, removeUserServerRequest} from "../functions/users";
import store from "./index";
import * as usersActions from "../actions/users";

const initialState: IUsersState = {
    userList: []
}

export default function users(state: IUsersState = initialState, action: TUsersAction) {

    switch (action.type) {

        case EUsersActionTypes.USERS__SET_USERS: {
            if (!('users' in action) || !Array.isArray(action.users)) return state

            return {...state, userList: action.users}
        }

        case EUsersActionTypes.USERS__ADD_USER: {
            if (!('user' in action) || !action.user) return state

            addUserServerRequest(action.user, (response: { result: boolean, users: Array<IUser> }) => {
                store.dispatch(usersActions.setUsersAction(response.users))
            })

            action.callback && action.callback()

            return state
        }

        case EUsersActionTypes.USERS__REMOVE_USER: {
            if (!('userId' in action) || !action.userId) return state

            removeUserServerRequest(action.userId, (response: { result: boolean, users: Array<IUser> }) => {
                store.dispatch(usersActions.setUsersAction(response.users))
            })

            action.callback && action.callback()

            return state
        }

        case EUsersActionTypes.USERS__EDIT_USER: {
            if (!('user' in action) || !action.user) return state

            editUserServerRequest(action.user, (response: { result: boolean, users: Array<IUser> }) => {
                store.dispatch(usersActions.setUsersAction(response.users))
            })

            action.callback && action.callback()

            return state
        }

        default:
            return state;
    }
}