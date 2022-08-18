// import { createFeatureSelector, createSelector } from '@ngrx/store'
// import { AppStateInterface } from 'src/app/shared/store/state/app.state'
// import { FeedStateInterface } from '../state/feed.state'

// export const feedFeatureSelector = createFeatureSelector<FeedStateInterface>(
//   'feed',
// )

// export const isLoadingSelector = createSelector(
//   feedFeatureSelector,
//   (feedState: FeedStateInterface) => feedState.isLoading,
// )

// export const errorsSelector = createSelector(
//   feedFeatureSelector,
//   (feedState: FeedStateInterface) => feedState.error,
// )
// export const feedSelector = createSelector(
//   feedFeatureSelector,
//   (feedState: FeedStateInterface) => feedState.data,
// )

// export const isLoggedInSelector = createSelector(
//   authFeatureSelector,
//   (feedState: FeedStateInterface) => feedState.isLoggedIn,
// )
// export const isAnonymousSelector = createSelector(
//   authFeatureSelector,
//   (feedState: FeedStateInterface) => feedState.isLoggedIn === false,
// )
// export const currentUserSelector = createSelector(
//   authFeatureSelector,
//   (feedState: FeedStateInterface) => feedState.currentUser,
// )
