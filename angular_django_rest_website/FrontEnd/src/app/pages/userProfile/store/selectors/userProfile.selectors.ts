import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/store/state/app.state'
import { UserProfileStateInterface } from '../state/userProfile.state'

export const userProfileFeatureSelector = createFeatureSelector<
  UserProfileStateInterface
>('userProfile')

export const userProfileSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.data,
)

export const isLoadingSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.isLoading,
)

export const errorSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.error,
)
