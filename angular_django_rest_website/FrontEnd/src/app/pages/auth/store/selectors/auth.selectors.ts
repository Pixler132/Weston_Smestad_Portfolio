import { createFeatureSelector, createSelector } from '@ngrx/store'

import { AppStateInterface } from 'src/app/shared/store/state/app.state'
import { AuthStateInterface } from '../state/auth.state'

export const authFeatureSelector = createFeatureSelector<AuthStateInterface>(
  'auth',
)

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting,
)

export const isLoadingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoading,
)
export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.validationErrors,
)

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn,
)
export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn === false,
)
export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser,
)
export const isOwnerSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isOwner,
)
export const isAdminSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isAdmin,
)
