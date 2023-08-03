import { EAuthActionTypes } from "../reducers/types";
import {IUserData} from "./main";

export type TAuthActionType = (typeof EAuthActionTypes)[keyof typeof EAuthActionTypes]

export interface IAuthDefaultAction {
    type: TAuthActionType
    callback?: Function | undefined
}
export interface IAuthLoginAction extends IAuthDefaultAction {
    username: string
    password: string
}
export interface IAuthSetAuthUserAction extends IAuthDefaultAction {
    user: IUserData
}

export type TAuthAction = IAuthDefaultAction | IAuthLoginAction | IAuthSetAuthUserAction




export interface ILoginProps {
    opacity?: boolean,
    errorShown: boolean
}
export interface ILoginDispatchProps {
    loginAction: Function
}



export interface IAuthState {
    authUser: Object | null
    isLogged: boolean
    errorShown: boolean
    loading: boolean
}
export interface ILoginState {
    username: string
    password: string
    loading: boolean
    submitEnable: boolean
}