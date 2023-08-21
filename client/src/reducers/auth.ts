import { EAuthActionTypes } from './types'
import * as authActions from './../actions/auth'
import * as daysActions from './../actions/days'
import * as usersActions from './../actions/users'
import * as companiesActions from './../actions/companies'
import * as commonActions from './../actions/common'
import store from './index'
import { authCheckServerRequest, getTokenClientRequest, loginServerRequest, removeTokenClientRequest, saveTokenClientRequest } from "../functions/auth"
import {IAuthState, ICheckLoggedUserAction, TAuthAction} from "../types/auth";
import {asyncFunction, notEmptyObjectProp} from "../functions/common";
import {IUser} from "../types/users";
import {IDay} from "../types/days";
import {ICompany} from "../types/companies";

const initialState: IAuthState = {
    authUser: null,
    isLogged: false,
    errorShown: false,
    loading: true
}

export default function auth(state = initialState, action: TAuthAction): IAuthState{
    switch (action.type) {
        case EAuthActionTypes.AUTH__LOGIN: {

            if ('username' in action && 'password' in action) {
                loginServerRequest(action.username, action.password, (response: { user: IUser, result: boolean, token: string | null, days: Array<IDay>, users: Array<IUser>, companies: Array<ICompany> }) => {
                    if (response.result && response.token && response.user){
                        saveTokenClientRequest(response.token)
                        store.dispatch(commonActions.setActiveTabAction('main'))
                        store.dispatch(authActions.setLoggedAction(response.user))
                        store.dispatch(daysActions.setDaysAction(response.days))
                        store.dispatch(usersActions.setUsersAction(response.users))
                        store.dispatch(companiesActions.setCompaniesAction(response.companies))
                    } else {
                        store.dispatch(authActions.loginFailedAction())
                    }

                    action.callback && action.callback()
                })
            }

            return state
        }

        case EAuthActionTypes.AUTH__SET_AUTH_USER:
            if (!('user' in action)) return state
            return { ...state, authUser: action.user}

        case EAuthActionTypes.AUTH__SET_LOGGED:
            return { ...state, isLogged: true, authUser: notEmptyObjectProp('user', action)}

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
            if (!token) {
                return { ...state, authUser: null, isLogged: false, loading: false}
            }

            const { successCallback, callback } = action as ICheckLoggedUserAction

            authCheckServerRequest(token, (response: { result: boolean, user: IUser, users: Array<IUser>, days: Array<IDay>, companies: Array<ICompany> }) => {
                const isLogged = response.result
                if (isLogged && notEmptyObjectProp('user', response)) {
                    store.dispatch(authActions.setLoggedAction(response.user))
                    successCallback && successCallback(response.users, response.days, response.companies)
                }
                callback && store.dispatch(callback())
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