import { createAction, props } from '@ngrx/store'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { ActionTypes } from './articles.types.actions'

export const favoriteArticleAction = createAction(
  ActionTypes.FAVORITE_ARTICLE,
  props<{ myArticle: ArticlesInterface }>(),
)
export const favoriteArticleSuccessAction = createAction(
  ActionTypes.FAVORITE_ARTICLE_SUCCESS,
  props<{ article: ArticlesInterface }>(),
)

export const favoriteArticleFailureAction = createAction(
  ActionTypes.FAVORITE_ARTICLE_FAILURE,
)
