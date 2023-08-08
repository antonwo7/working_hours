import {EUsersActionTypes} from "../reducers/types";
import {IAddUserModalState, IUser, TUsersAction} from "../types/users";

export function loadUsersAction(users: Array<IUser>, callback?: Function): TUsersAction {


    return {
        type: EUsersActionTypes.USERS__SET_USERS,
        users,
        callback
    }
}
export function setUsersAction(users: Array<IUser>, callback?: Function): TUsersAction {
    return {
        type: EUsersActionTypes.USERS__SET_USERS,
        users,
        callback
    }
}
export function addUserAction(user: IAddUserModalState, callback?: Function): TUsersAction {
    return {
        type: EUsersActionTypes.USERS__ADD_USER,
        user,
        callback
    }
}
export function editUserAction(user: IAddUserModalState, callback?: Function): TUsersAction {
    return {
        type: EUsersActionTypes.USERS__EDIT_USER,
        user,
        callback
    }
}
export function removeUserAction(userId: number, callback?: Function): TUsersAction {
    return {
        type: EUsersActionTypes.USERS__REMOVE_USER,
        userId,
        callback
    }
}