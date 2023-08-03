require('dotenv').config()

export const loginAPIUrl = process.env.API_URL + 'auth/login/'
export const registrationAPIUrl = process.env.API_URL + 'api/auth/registration'
export const tokenValidationAPIUrl = process.env.API_URL + 'api/auth/validation.php'

export const getUsersAPIUrl = process.env.API_URL + 'api/users/get_users'