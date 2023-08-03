import { EAuthActionTypes } from '../reducers/types';
import store from '../reducers';
import { IAuthLoginAction } from "../types/auth";

export function loginAction(email: string, password: string, callback?: Function): IAuthLoginAction {
    return {
        type: EAuthActionTypes.AUTH__LOGIN,
        email,
        password,
        callback
    }
}

export function checkLoggedUser(){
    return {
        type: EAuthActionTypes.AUTH__CHECK
    }
}

export function logoutUser(){
    return {
        type: EAuthActionTypes.AUTH__LOGOUT
    }
}

export function hideError(){
    return {
        type: EAuthActionTypes.AUTH__HIDE_ERROR
    }
}

export function setLogged(){
    return {
        type: EAuthActionTypes.AUTH__SET_LOGGED
    }
}

export function loginFailed(){
    return {
        type: EAuthActionTypes.AUTH__LOGIN_FAILED
    }
}

export function setLoading(){
    return {
        type: EAuthActionTypes.AUTH__SET_LOADING
    }
}

export function hideLoading(){
    return {
        type: EAuthActionTypes.AUTH__HIDE_LOADING
    }
}