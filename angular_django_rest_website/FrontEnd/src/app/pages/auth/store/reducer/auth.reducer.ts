import { Action, createReducer, on } from '@ngrx/store'
import { AuthStateInterface } from '../state/auth.state'
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/auth.getCurrentUser.actions'
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/auth.login.actions'
import * as authRegAction from '../actions/auth.register.actions'
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
} from '../actions/auth.updateCurrentUserData.actions'
import { logoutSuccessAction } from '../actions/auth.sync.actions'

const initalState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: false,
  validationErrors: null,
  isLoading: false,
  isOwner: null,
  isAdmin: null,
}

const authReducers = createReducer(
  initalState,
  on(
    authRegAction.registerAction, //<-auth.register.actions'
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    }),
  ),
  on(
    authRegAction.registerSuccessAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: false,

      //auth.register.actions.ts
    }),
  ),
  on(
    authRegAction.registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors, //<-auth.register.actions.ts
    }),
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    }),
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoggedIn: true,
      isSubmitting: false,
      currentUser: action.currentUser,
      isOwner: action.currentUser.currentUser.owner,
      isAdmin: action.currentUser.currentUser.admin,
    }),
  ),
  on(
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }),
  ),
  on(
    getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,

      currentUser: action.currentUser,
    }),
  ),
  on(
    getCurrentUserFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    }),
  ),
  on(
    updateCurrentUserAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    }),
  ),
  on(
    updateCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: null,
      currentUser: action.currentUser,
    }),
  ),
  on(
    updateCurrentUserFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
      //currentUser: action.currentUser,
    }),
  ),
  on(
    logoutSuccessAction,
    (state): AuthStateInterface => ({
      ...state,
      ...initalState,
      isLoggedIn: false,
    }),
  ),
)

export function authReducer(state: AuthStateInterface, action: Action) {
  return authReducers(state, action)
}
