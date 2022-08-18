import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/store/state/app.state'
import { adapter, State } from '../reducer/CommentFeed.reducer'

export const commentFeedFeatureSelector = createFeatureSelector<State>(
  'CommentFeed',
)

export const isLoadingSelector = createSelector(
  commentFeedFeatureSelector,
  (feedState) => feedState.isLoading,
)
export const errorsSelector = createSelector(
  commentFeedFeatureSelector,
  (feedState) => feedState.error,
)

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors()
export const selectAllFeeds = selectAll
export const selectAllFeed = createSelector(
  commentFeedFeatureSelector,
  selectAllFeeds,
)
