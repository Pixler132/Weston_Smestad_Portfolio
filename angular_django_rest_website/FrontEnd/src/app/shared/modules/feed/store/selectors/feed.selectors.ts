import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/store/state/app.state'
import { adapter, State } from '../reducer/feed.reducer'
import { FeedStateInterface } from '../state/feed.state'

export const feedFeatureSelector = createFeatureSelector<State>('feed')

export const articleCountSelector = createSelector(
  feedFeatureSelector,
  (feedState) => feedState.articleCount,
)
export const isLoadingSelector = createSelector(
  feedFeatureSelector,
  (feedState) => feedState.isLoading,
)
export const errorsSelector = createSelector(
  feedFeatureSelector,
  (feedState) => feedState.error,
)

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors()
export const selectAllFeeds = selectAll
export const selectAllFeed = createSelector(feedFeatureSelector, selectAllFeeds)
