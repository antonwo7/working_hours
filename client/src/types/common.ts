import { ECommonActionTypes } from "../reducers/types";

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