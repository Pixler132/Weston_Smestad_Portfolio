import { createAction, props } from '@ngrx/store'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'

import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'
import { AuthRegistrationRequestInterface } from '../../interfaces/auth.registration.request.interface'

import { ActionTypes } from './auth.types.actions'

export const registerAction = createAction(
  //-> auth.reducer.ts @@ auth.register.effects.ts
  ActionTypes.REGISTER, //<-auth.types.actions
  props<{ payload: AuthRegistrationRequestInterface }>(),
)
export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS, //<-auth.types.actions
)
export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE, //<-auth.types.actions
  props<{ errors: BackendErrorsInterface }>(),
)
