import { ECommonActionTypes } from "../reducers/types";
import {ICommonDefaultAction, IGenerateReportAction, ISetActiveTabCommonAction} from "../types/common";

export function showLoadingAction(): ICommonDefaultAction {
    return {
        type: ECommonActionTypes.COMMON__SHOW_LOADING,
    }
}

export function hideLoadingAction(): ICommonDefaultAction {
    return {
        type: ECommonActionTypes.COMMON__HIDE_LOADING,
    }
}

export function setActiveTabAction(activeTab: number): ISetActiveTabCommonAction {
    return {
        type: ECommonActionTypes.COMMON__ACTIVE_TAB_CHANGING,
        activeTab: activeTab
    }
}

export function showCompanyModalAction(): ICommonDefaultAction {
    return {
        type: ECommonActionTypes.COMMON__SHOW_COMPANY_MODAL,
    }
}

export function hideCompanyModalAction(): ICommonDefaultAction {
    return {
        type: ECommonActionTypes.COMMON__HIDE_COMPANY_MODAL,
    }
}

export function generateReportAction(months: Array<number>, userId: number, callback?: Function): IGenerateReportAction {
    return {
        type: ECommonActionTypes.COMMON__GENERATE_REPORT,
        months,
        userId,
        callback
    }
}