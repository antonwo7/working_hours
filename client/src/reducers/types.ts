export enum EAuthActionTypes {
    AUTH__LOGIN = 'AUTH__LOGIN',
    AUTH__LOGOUT = 'AUTH__LOGOUT',
    AUTH__CHECK = 'AUTH__CHECK',
    AUTH__HIDE_ERROR = 'AUTH__HIDE_ERROR',
    AUTH__SET_LOGGED = 'AUTH__SET_LOGGED',
    AUTH__SET_UNLOGGED = 'AUTH__SET_UNLOGGED',
    AUTH__LOGIN_FAILED = 'AUTH__LOGIN_FAILED',
    AUTH__SET_LOADING = 'AUTH__SET_LOADING',
    AUTH__HIDE_LOADING = 'AUTH__HIDE_LOADING',
    AUTH__SET_AUTH_USER = 'AUTH__SET_AUTH_USER',
}
export enum ECommonActionTypes {
    COMMON__SHOW_LOADING = 'COMMON__SHOW_LOADING',
    COMMON__HIDE_LOADING = 'COMMON__HIDE_LOADING',
    COMMON__ACTIVE_TAB_CHANGING = 'COMMON__ACTIVE_TAB_CHANGING',
    COMMON__SHOW_COMPANY_MODAL = 'COMMON__SHOW_COMPANY_MODAL',
    COMMON__HIDE_COMPANY_MODAL = 'COMMON__HIDE_COMPANY_MODAL',
    COMMON__GENERATE_REPORT = 'COMMON__GENERATE_REPORT'
}
export enum EUsersActionTypes {
    USERS__SET_USERS = 'USERS__SET_USERS',
    USERS__ADD_USER = 'USERS__ADD_USER',
    USERS__REMOVE_USER = 'USERS__REMOVE_USER',
    USERS__EDIT_USER = 'USERS__EDIT_USER'
}
export enum EDaysActionTypes {
    DAYS__SET_DAYS = 'DAYS__SET_DAYS',
    DAYS__ADD_DAY = 'DAYS__ADD_DAY',
    DAYS__REMOVE_DAY = 'DAYS__REMOVE_DAY',
    DAYS__LOAD_DAYS = 'DAYS__LOAD_DAYS'
}
export enum ECompaniesActionTypes {
    COMPANIES__EDIT_COMPANY = 'COMPANIES__EDIT_COMPANY',
    COMPANIES__SET_COMPANIES = 'COMPANIES__SET_COMPANIES',
}