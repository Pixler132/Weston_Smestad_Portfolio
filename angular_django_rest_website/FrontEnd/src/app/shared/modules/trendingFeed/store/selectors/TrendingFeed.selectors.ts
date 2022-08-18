import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/store/state/app.state'
import { adapter, State } from '../reducer/TrendingFeed.reducer'

export const trendingFeedFeatureSelector = createFeatureSelector<State>(
  'trendingFeed',
)

export const articleCountSelector = createSelector(
  trendingFeedFeatureSelector,
  (feedState) => feedState.articleCount,
)
export const isLoadingSelector = createSelector(
  trendingFeedFeatureSelector,
  (trendingFeedState) => trendingFeedState.isLoading,
)
export const errorsSelector = createSelector(
  trendingFeedFeatureSelector,
  (trendingFeedState) => trendingFeedState.error,
)

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors()
export const selectAllTrendingFeeds = selectAll
export const selectAllTrendingFeed = createSelector(
  trendingFeedFeatureSelector,
  selectAllTrendingFeeds,
)
