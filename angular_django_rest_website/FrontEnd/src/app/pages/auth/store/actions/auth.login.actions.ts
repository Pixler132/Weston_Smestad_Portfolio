import { createAction, props } from '@ngrx/store'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'

import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'
import { LoginRequestInterface } from '../../interfaces/auth.login.request.interface'

import { ActionTypes } from './auth.types.actions'

export const loginAction = createAction(
  //-> auth.reducer.ts @@ auth.login.effects.ts
  ActionTypes.LOGIN, //<-auth.types.actions
  props<{ payload: LoginRequestInterface }>(),
)
export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS, //<-auth.types.actions
  props<{ currentUser: CurrentUserInterface }>(),
)
export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ errors: BackendErrorsInterface }>(), //<-auth.types.actions
)
export const emailValFailureAction = createAction(
  ActionTypes.EMAIL_VALIDATION_FAILURE,
)
