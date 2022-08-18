import { createAction, props } from '@ngrx/store'

import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'

import { ActionTypes } from './auth.types.actions'

export const getCurrentUserAction = createAction(
  ActionTypes.GET_CURRENT_USER, //<-auth.types.actions
)
export const getCurrentUserSuccessAction = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS, //<-auth.types.actions
  props<{ currentUser: CurrentUserInterface }>(),
)
export const getCurrentUserFailureAction = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE, //<-auth.types.actions
)
