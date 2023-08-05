import {EUsersActionTypes} from "../reducers/types";
import {IUser, TUsersAction} from "../types/users";

export function setUsersAction(users: Array<IUser>, callback?: Function): TUsersAction {
    return {
        type: EUsersActionTypes.USERS__SET_USERS,
        users,
        callback
    }
}
export function addUserAction(user: IUser, callback?: Function): TUsersAction {
    return {
        type: EUsersActionTypes.USERS__ADD_USER,
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