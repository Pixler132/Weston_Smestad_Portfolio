import { createAction, props } from '@ngrx/store'

import { ArticleInputInterface } from 'src/app/shared/interfaces/articleInput.interface'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'

import { ActionTypes } from './updateArticle.types.actions'

export const updateArticleAction = createAction(
  ActionTypes.UPDATE_ARTICLE,
  props<{ articleInput: ArticleInputInterface; title: string }>(),
)

export const updateArticleSuccessAction = createAction(
  ActionTypes.UPDATE_ARTICLE_SUCCESS,
  props<{ article: ArticlesInterface }>(),
)

export const updateArticleFailureAction = createAction(
  ActionTypes.UPDATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrorsInterface }>(),
)
export const saveArticleAction = createAction(
  ActionTypes.SAVE_ARTICLE,
  props<{ article: ArticlesInterface }>(),
)
