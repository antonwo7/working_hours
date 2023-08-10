import {IAuthState} from "./auth";
import {ICommonState} from "./common";
import MainPage from "../components/pages/MainPage";
import {IUsersState} from "./users";
import {LegacyRef, MouseEventHandler} from "react";
import {IDaysState} from "./days";
import {ICompaniesState} from "./companies";
import {hideCompanyModalAction} from "../actions/common";


export interface IDefaultAction {
    type: string,
    callback?: Function | undefined
}

export type TPageProps = {
    loading?: boolean
}
export interface IAppProps {
    authUser: string | null,
    isLogged: boolean,
    loading: boolean
}
export interface ITabHeaderItemProps {
    href: string
    label: string
    onClick: Function
    isActive: boolean
}
export interface ITabContentItemProps {
    id: string
    TabComponent: typeof MainPage
    isActive: boolean,
    loading?: boolean,
    activeTab?: string
}
export type TContentProps = {
    loading?: boolean
    activeTab: string
    companyModalShown: boolean
    hideCompanyModalAction: Function
}



export interface IState {
    common: ICommonState
    auth: IAuthState
    users: IUsersState,
    days: IDaysState,
    companies: ICompaniesState,
}

export interface IButtonProps {
    type?: 'button' | 'submit' | 'reset'
    id?: string
    name?: string
    disabled?: boolean
    loading?: boolean
    label?: string
    onClick: MouseEventHandler<HTMLButtonElement>
}
export interface IButtonLinkProps {
    id?: string
    name?: string
    disabled?: boolean
    loading?: boolean
    title: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}
export interface IFileProps {
    id?: string
    name: string
    title: string
}

export interface ISelectProps {
    value?: string | number;
    inputClassName?: string
    labelClassName?: string
    title?: string
    onChange: Function
    id?: string
    emptyOption?: boolean
    options: object
}

export interface IInputProps {
    value?: string;
    inputClassName?: string
    labelClassName?: string
    title?: string
    onChange: Function
    id?: string
    type: string
    name?: string
    innerRef?: LegacyRef<HTMLInputElement>
    required?: boolean
}
export interface IUploadFormState {
    loading: boolean,
    file: File | null,
    type: string | null,
    date: string | null
}

export interface IInputState {
    value?: string | null
}

export interface ISelectState {
    value?: string | number;
}

export interface IIconProps {
    width: number
    height: number
}

export interface IAnyObject {[key: string | number] : string}