export enum ActionTypes {
  REGISTER = '[Auth] Registering',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',

  LOGIN = '[Auth] Loginng',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',

  GET_CURRENT_USER = '[Auth] Getting current user',
  GET_CURRENT_USER_SUCCESS = '[Auth] Get current user Success',
  GET_CURRENT_USER_FAILURE = '[Auth] Get current user Failure',

  UPDATE_CURRENT_USER = '[Auth] Updating current user',
  UPDATE_CURRENT_USER_SUCCESS = '[Auth] Updating success',
  UPDATE_CURRENT_USER_FAILURE = '[Auth] Updating failure',

  LOGOUT = '[Auth] Logout',
  LOGOUT_SUCCESS_ACTION = '[Auth] Logout Success',
  LOGOUT_FAILURE_ACTION = '[Auth] Logout failure',

  EMAIL_VALIDATION = '[Auth] Email validated',
  EMAIL_VALIDATION_FAILURE = '[Auth] Email not validated',
  EMAIL_VALIDATION_SUCCESS = '[Auth] Email is validated',
}
