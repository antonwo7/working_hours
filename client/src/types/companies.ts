
import {ECompaniesActionTypes} from "../reducers/types";

export interface ICompany {
    name: string
    cif: string
    code: string
    law_text: string
    id?: number
}

export interface ICompaniesState {
    companyList: Array<ICompany>
}

export interface ICompaniesDefaultAction {
    type: TCompaniesActionType
    callback?: Function | undefined
}
export interface ICompaniesEditCompanyAction {
    type: TCompaniesActionType
    company: ICompany
    callback?: Function | undefined
}
export interface ICompaniesSetCompaniesAction {
    type: TCompaniesActionType
    companies: Array<ICompany>
    callback?: Function | undefined
}

export type TCompaniesActionType = (typeof ECompaniesActionTypes)[keyof typeof ECompaniesActionTypes]
export type TCompaniesAction = ICompaniesDefaultAction | ICompaniesEditCompanyAction | ICompaniesSetCompaniesAction