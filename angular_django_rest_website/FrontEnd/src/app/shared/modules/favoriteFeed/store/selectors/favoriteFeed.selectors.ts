import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/store/state/app.state'
import { adapter, State } from '../reducer/favoriteFeed.reducer'

export const favoriteFeedFeatureSelector = createFeatureSelector<State>(
  'FavoriteFeed',
)

export const isLoadingSelector = createSelector(
  favoriteFeedFeatureSelector,
  (feedState) => feedState.isLoading,
)
export const errorsSelector = createSelector(
  favoriteFeedFeatureSelector,
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
  favoriteFeedFeatureSelector,
  selectAllFeeds,
)
