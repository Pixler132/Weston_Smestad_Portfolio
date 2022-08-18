import { createAction, props } from '@ngrx/store'

import { ActionTypes } from './auth.types.actions'

export const emailValidationAction = createAction(
  ActionTypes.EMAIL_VALIDATION, //<-auth.types.actions
  props<{ url: string }>(),
)
export const emailValidationSuccessAction = createAction(
  ActionTypes.EMAIL_VALIDATION_SUCCESS, //<-auth.types.actions
)
export const emailValidationFailureAction = createAction(
  ActionTypes.EMAIL_VALIDATION_FAILURE, //<-auth.types.actions
)
