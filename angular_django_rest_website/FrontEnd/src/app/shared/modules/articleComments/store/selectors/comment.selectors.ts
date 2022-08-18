import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/store/state/app.state'
import { CommentStateInterface } from '../state/comment.state'

export const commentFeatureSelector = createFeatureSelector<
  CommentStateInterface
>('comment')

export const isLoadingSelector = createSelector(
  commentFeatureSelector,
  (commentState: CommentStateInterface) => commentState.isLoading,
)

export const errorsSelector = createSelector(
  commentFeatureSelector,
  (commentState: CommentStateInterface) => commentState.error,
)
export const commentSelector = createSelector(
  commentFeatureSelector,
  (commentState: CommentStateInterface) => commentState.data,
)

// export const isLoggedInSelector = createSelector(
//   authFeatureSelector,
//   (commentState: commentStateInterface) => commentState.isLoggedIn,
// )
// export const isAnonymousSelector = createSelector(
//   authFeatureSelector,
//   (commentState: commentStateInterface) => commentState.isLoggedIn === false,
// )
// export const currentUserSelector = createSelector(
//   authFeatureSelector,
//   (commentState: commentStateInterface) => commentState.currentUser,
// )
