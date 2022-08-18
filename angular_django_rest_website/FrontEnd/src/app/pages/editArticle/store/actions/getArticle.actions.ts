import { createAction, props } from '@ngrx/store'

import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'

import { ActionTypes } from './updateArticle.types.actions'

export const getArticleAction = createAction(
  ActionTypes.GET_ARTICLE,
  props<{ title: string }>(),
)

export const getArticleSuccessAction = createAction(
  ActionTypes.GET_ARTICLE_SUCCESS,
  props<{ article: ArticlesInterface }>(),
)

export const getArticleFailureAction = createAction(
  ActionTypes.GET_ARTICLE_FAILURE,
)
