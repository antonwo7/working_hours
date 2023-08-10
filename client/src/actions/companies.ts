import {ECompaniesActionTypes} from "../reducers/types";
import {ICompany, TCompaniesAction} from "../types/companies";

export function editCompanyAction(company: ICompany, callback?: Function): TCompaniesAction {
    return {
        type: ECompaniesActionTypes.COMPANIES__EDIT_COMPANY,
        company,
        callback
    }
}

export function setCompaniesAction(companies: Array<ICompany>, callback?: Function): TCompaniesAction {
    return {
        type: ECompaniesActionTypes.COMPANIES__SET_COMPANIES,
        companies,
        callback
    }
}