import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/store/state/app.state'
import { EditArticleStateInterface } from '../state/editArticle.state'

export const editArticleFeatureSelector = createFeatureSelector<
  EditArticleStateInterface
>('editActicle')

export const articleSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.article,
)

export const validationErrorsSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) =>
    editArticleState.validationErrors,
)

export const isLoadingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isLoading,
)
export const isSubmittingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) =>
    editArticleState.isSubmitting,
)
