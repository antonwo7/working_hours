import { ICommonState, TCommonAction } from "../types/common";
import { ECommonActionTypes } from "./types";

const initialState: ICommonState = {
    loading: false,
    activeTab: 'main',
}

export default function common(state: ICommonState = initialState, action: TCommonAction) {

    switch (action.type) {

        case ECommonActionTypes.COMMON__SHOW_LOADING: {
            return {...state, loading: true};
        }

        case ECommonActionTypes.COMMON__HIDE_LOADING: {
            return {...state, loading: false};
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