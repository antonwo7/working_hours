import { ECommonActionTypes } from "../reducers/types";
import { ICommonDefaultAction, ISetActiveTabCommonAction } from "../types/common";

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