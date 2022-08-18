import { createAction, props } from '@ngrx/store'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'

import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'
import { CurrentUserInputInterface } from 'src/app/shared/interfaces/currrentUserInputInterface'
import { AuthUpdateInterface } from '../../interfaces/authUpdate.interface'

import { ActionTypes } from './auth.types.actions'

export const updateCurrentUserAction = createAction(
  //-> auth.reducer.ts @@ auth.login.effects.ts
  ActionTypes.UPDATE_CURRENT_USER, //<-auth.types.actions
  props<{ currentUserInput: AuthUpdateInterface }>(),
)
export const updateCurrentUserSuccessAction = createAction(
  ActionTypes.UPDATE_CURRENT_USER_SUCCESS, //<-auth.types.actions
  props<{ currentUser: CurrentUserInterface | null }>(),
)
export const updateCurrentUserFailureAction = createAction(
  ActionTypes.UPDATE_CURRENT_USER_FAILURE, //<-auth.types.actions
  props<{ errors: BackendErrorsInterface }>(),
)
