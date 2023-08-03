import { EAuthActionTypes } from '../reducers/types';
import store from '../reducers';
import { IAuthLoginAction } from "../types/auth";

export function loginAction(username: string, password: string, callback?: Function): IAuthLoginAction {
    return {
        type: EAuthActionTypes.AUTH__LOGIN,
        username,
        password,
        callback
    }
}

export function checkLoggedUserAction(){
    return {
        type: EAuthActionTypes.AUTH__CHECK
    }
}

export function logoutUserAction(){
    return {
        type: EAuthActionTypes.AUTH__LOGOUT
    }
}

export function hideErrorAction(){
    return {
        type: EAuthActionTypes.AUTH__HIDE_ERROR
    }
}

export function setLoggedAction(){
    return {
        type: EAuthActionTypes.AUTH__SET_LOGGED
    }
}

export function loginFailedAction(){
    return {
        type: EAuthActionTypes.AUTH__LOGIN_FAILED
    }
}

export function setLoadingAction(){
    return {
        type: EAuthActionTypes.AUTH__SET_LOADING
    }
}

export function hideLoadingAction(){
    return {
        type: EAuthActionTypes.AUTH__HIDE_LOADING
    }
}