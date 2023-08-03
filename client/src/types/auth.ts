import { EAuthActionTypes } from "../reducers/types";

export type TAuthActionType = (typeof EAuthActionTypes)[keyof typeof EAuthActionTypes]

export interface IAuthDefaultAction {
    type: TAuthActionType
    callback?: Function | undefined
}
export interface IAuthLoginAction extends IAuthDefaultAction {
    email: string
    password: string
}

export type TAuthAction = IAuthDefaultAction | IAuthLoginAction




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
    email: string
    password: string
    loading: boolean
    submitEnable: boolean
}