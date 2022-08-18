import { createAction } from '@ngrx/store'
import { ActionTypes } from './auth.types.actions'

export const logoutAction = createAction(ActionTypes.LOGOUT)
export const logoutSuccessAction = createAction(
  ActionTypes.LOGOUT_SUCCESS_ACTION,
)
export const logoutFailureAction = createAction(
  ActionTypes.LOGOUT_FAILURE_ACTION,
)
