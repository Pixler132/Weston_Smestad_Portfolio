import { createAction, props } from '@ngrx/store'

import { ArticleInputInterface } from 'src/app/shared/interfaces/articleInput.interface'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'

import { ActionTypes } from './createArticle.types.actions'

export const createArticleAction = createAction(
  ActionTypes.CREATE_ARTICLE,
  props<{ articleInput: ArticleInputInterface }>(),
)

export const createArticleSuccessAction = createAction(
  ActionTypes.CREATE_ARTICLE_SUCCESS,
  props<{ article: ArticlesInterface }>(),
)

export const createArticleFailureAction = createAction(
  ActionTypes.CREATE_ARTICLE_FAILURE,
  //props<{ errors: BackendErrorsInterface }>(),
)
