import { getAppUrl } from "./functions";

export const loginAPIUrl = getAppUrl() + 'api/auth/login'
export const registrationAPIUrl = getAppUrl() + 'api/auth/registration'
export const tokenValidationAPIUrl = getAppUrl() + 'api/auth/validation.php'

export const getUsersAPIUrl = getAppUrl() + 'api/users/get_users'