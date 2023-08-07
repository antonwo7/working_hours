import { ECommonActionTypes } from "../reducers/types";
import {logoutUserAction} from "../actions/auth";
import {IAuthState} from "./auth";
import {IUser} from "./users";

export type TCommonActionType = (typeof ECommonActionTypes)[keyof typeof ECommonActionTypes]
export type TCommonAction = ICommonDefaultAction | ISetActiveTabCommonAction

export interface ICommonDefaultAction {
    type: TCommonActionType
    callback?: Function | undefined
}
export interface ISetActiveTabCommonAction extends ICommonDefaultAction{
    activeTab: number
}
export interface ICommonState {
    loading: boolean
    activeTab: string
}


export interface IPageLoadingProps {
    opacity?: boolean
}
export interface INavigationProps {
    isLogged: boolean
    activeTab: string
}
export interface INavigationDispatchProps {
    setActiveTabAction: Function
    logoutUserAction: Function,
    authUser?: IUser | null
}




export interface ICommonState {
    loading: boolean,
    activeTab: string
}