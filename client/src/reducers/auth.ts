import { EAuthActionTypes } from './types'
import * as authActions from './../actions/auth'
import store from './index'
import { authCheckServerRequest, getTokenClientRequest, loginServerRequest, removeTokenClientRequest, saveTokenClientRequest } from "../functions/auth"
import {IAuthState, TAuthAction} from "../types/auth";

const initialState: IAuthState = {
    authUser: null,
    isLogged: false,
    errorShown: false,
    loading: true
}

export default function auth(state = initialState, action: TAuthAction): IAuthState{
    switch (action.type) {
        case EAuthActionTypes.AUTH__LOGIN: {

            if ('email' in action && 'password' in action) {
                loginServerRequest(action.email, action.password, (response: { result: boolean, token: string | null }) => {
                    if (response.result && response.token){
                        saveTokenClientRequest(response.token)
                        store.dispatch(authActions.setLoggedAction())
                    } else {
                        store.dispatch(authActions.loginFailedAction())
                    }

                    action.callback && action.callback()
                })
            }

            return state
        }

        case EAuthActionTypes.AUTH__SET_LOGGED:
            return { ...state, isLogged: true}

        case EAuthActionTypes.AUTH__SET_UNLOGGED:
            return { ...state, isLogged: false}

        case EAuthActionTypes.AUTH__HIDE_ERROR:
            return { ...state, errorShown: false}

        case EAuthActionTypes.AUTH__LOGIN_FAILED: {
            setTimeout(() => store.dispatch(authActions.hideErrorAction()), 3000)

            return { ...state, errorShown: true, isLogged: false}
        }

        case EAuthActionTypes.AUTH__LOGOUT:
            removeTokenClientRequest()
            return { ...state, isLogged: false }

        case EAuthActionTypes.AUTH__CHECK: {
            const token = getTokenClientRequest()
            console.log('token', token)
            if (!token) return state

            authCheckServerRequest(token, (response: { result: boolean }) => {
                const isLogged = response.result
                if (isLogged){
                    store.dispatch(authActions.setLoggedAction())
                }

                store.dispatch(authActions.hideLoadingAction())
            })

            return state
        }

        case EAuthActionTypes.AUTH__SET_LOADING:
            return { ...state, loading: true }

        case EAuthActionTypes.AUTH__HIDE_LOADING:
            return { ...state, loading: false }

        default:
            return state
    }
}