import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/store/state/app.state'

import { ArticleStateInterface } from '../state/article.State'

export const articleFeatureSelector = createFeatureSelector<
  ArticleStateInterface
>('article')

export const isLoadingSelector = createSelector(
  articleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.isLoading,
)

export const errorSelector = createSelector(
  articleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.error,
)

export const articleSelector = createSelector(
  articleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.data,
)
export const isFavoritingSelector = createSelector(
  articleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.isFavoriting,
)
