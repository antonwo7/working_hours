import {ECompaniesActionTypes} from "./types";
import store from "./index";
import * as companiesActions from "../actions/companies";
import {ICompaniesState, ICompany, TCompaniesAction} from "../types/companies";
import {editCompanyServerRequest} from "../functions/companies";

const initialState: ICompaniesState = {
    companyList: []
}

export default function companies(state: ICompaniesState = initialState, action: TCompaniesAction) {

    switch (action.type) {

        case ECompaniesActionTypes.COMPANIES__SET_COMPANIES: {
            if (!('companies' in action) || !Array.isArray(action.companies)) return state

            return {...state, companyList: action.companies}
        }

        case ECompaniesActionTypes.COMPANIES__EDIT_COMPANY: {
            if (!('company' in action) || !action.company) return state

            editCompanyServerRequest(action.company, (response: { result: boolean, companies: Array<ICompany> }) => {
                store.dispatch(companiesActions.setCompaniesAction(response.companies))
                action.callback && action.callback()
            })

            return state
        }

        default:
            return state;
    }
}