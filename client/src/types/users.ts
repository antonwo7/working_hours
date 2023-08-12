import {EUsersActionTypes} from "../reducers/types";
import {addUserAction, editUserAction} from "../actions/users";

export interface IUsersDefaultAction {
    type: TUsersActionType
    callback?: Function | undefined
}
export interface IUsersSetUsersAction extends IUsersDefaultAction {
    users: Array<IUser>
}
export interface IUsersAddUserAction extends IUsersDefaultAction {
    user: IAddUserModalState
}
export interface IUsersRemoveUserAction extends IUsersDefaultAction {
    userId: number
}


export type TUsersActionType = (typeof EUsersActionTypes)[keyof typeof EUsersActionTypes]
export type TUsersAction = IUsersDefaultAction | IUsersAddUserAction | IUsersRemoveUserAction | IUsersSetUsersAction

export interface IUser {
    id: number,
    name: string
    username: string
    nif?: string
    naf?: string
    contract_code?: string,
    role?: string
}
export interface IAddUserModalState {
    id?: number, name: string, username: string, password: string, nif: string, naf: string, contract_code: string
}
export interface IUsersState {
    userList: Array<IUser>
}
export interface IUserProps {
    removeUserAction: Function
    addUserAction: Function
    editUserAction?: Function
    userList: Array<IUser>
    generateReportAction: Function
}
