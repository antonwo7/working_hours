import {IAuthState} from "./auth";
import {ICommonState} from "./common";
import MainFormPage from "../components/pages/MainFormPage";


export interface IDefaultAction {
    type: string,
    callback?: Function | undefined
}

export interface IUserData {
    name: string
    username: string
    nif?: string
    naf?: string
    contract_code?: string
    role: string | null
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
    TabComponent: typeof MainFormPage
    isActive: boolean,
    loading?: boolean,
    activeTab?: string
}
export type TContentProps = {
    loading?: boolean
    activeTab: string
}



export interface IState {
    auth: IAuthState,
    common: ICommonState
}