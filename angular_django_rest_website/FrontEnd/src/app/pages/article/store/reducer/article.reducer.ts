import { createReducer, on, Action } from '@ngrx/store'
import { routerNavigationAction } from '@ngrx/router-store'
import { ArticleStateInterface } from '../state/article.State'
import {
  getArticleAction,
  getArticleSuccessAction,
  getArticleFailureAction,
} from '../actions/getArticle.actions'
import {
  favoriteArticleAction,
  favoriteArticleFailureAction,
  favoriteArticleSuccessAction,
} from '../actions/favoriteArticle.actions'

const initialState: ArticleStateInterface = {
  data: null,
  isLoading: false,
  error: null,
  isFavoriting: false,
}

const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getArticleSuccessAction,
    (state, action): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      data: action.article,
    }),
  ),
  on(
    getArticleFailureAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
  on(
    favoriteArticleAction,
    (state): ArticleStateInterface => ({
      ...state,
      isFavoriting: true,
    }),
  ),
  on(
    favoriteArticleSuccessAction,
    (state, action): ArticleStateInterface => ({
      ...state,
      data: action.article,
      isFavoriting: false,
    }),
  ),

  on(
    favoriteArticleFailureAction,
    (state): ArticleStateInterface => ({
      ...state,
      isFavoriting: false,
    }),
  ),
  on(routerNavigationAction, (): ArticleStateInterface => initialState),
)

export function ArticleReducers(state: ArticleStateInterface, action: Action) {
  return articleReducer(state, action)
}
