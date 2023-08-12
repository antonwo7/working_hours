import {ICommonState, TCommonAction} from "../types/common"
import {ECommonActionTypes} from "./types"
import {generateReportServerRequest} from "../functions/common"

const initialState: ICommonState = {
    loading: false,
    activeTab: 'main',
    companyModalShown: false
}

export default function common(state: ICommonState = initialState, action: TCommonAction) {

    switch (action.type) {

        case ECommonActionTypes.COMMON__SHOW_LOADING: {
            return {...state, loading: true};
        }

        case ECommonActionTypes.COMMON__SHOW_COMPANY_MODAL: {
            return {...state, companyModalShown: true};
        }

        case ECommonActionTypes.COMMON__HIDE_COMPANY_MODAL: {
            return {...state, companyModalShown: false};
        }

        case ECommonActionTypes.COMMON__HIDE_LOADING: {
            return {...state, loading: false};
        }

        case ECommonActionTypes.COMMON__GENERATE_REPORT: {
            if (!('months' in action && 'userId' in action)) return state

            generateReportServerRequest(action.months, action.userId, (response: { result: boolean, fileUrl: string }) => {
                if (response.result && response.fileUrl) {
                    action.callback && action.callback(response.fileUrl)
                }
            })
            return state;
        }

        case ECommonActionTypes.COMMON__ACTIVE_TAB_CHANGING: {
            if ('activeTab' in action) {
                return {...state, activeTab: action.activeTab};
            }

            return state;
        }

        default:
            return state;
    }
}