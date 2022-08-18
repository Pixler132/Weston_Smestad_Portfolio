import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/store/state/app.state'
import { CreateArticleStateInterface } from '../state/createArticle.state'

export const createArticleFeatureSelector = createFeatureSelector<
  AppStateInterface,
  CreateArticleStateInterface
>('createActicle')

export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.isSubmitting,
)

export const validationErrorsSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.validationErrors,
)
