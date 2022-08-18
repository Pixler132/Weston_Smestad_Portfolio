import { createAction, props } from '@ngrx/store'

import { ActionTypes } from './articles.types.actions'

export const deleteArticleAction = createAction(
  ActionTypes.DELETE_ARTICLE,
  props<{ title: string }>(),
)

export const deleteArticleSuccessAction = createAction(
  ActionTypes.DELETE_ARTICLE_SUCCESS,
)

export const deleteArticleFailureAction = createAction(
  ActionTypes.DELETE_ARTICLE_FAILURE,
)
