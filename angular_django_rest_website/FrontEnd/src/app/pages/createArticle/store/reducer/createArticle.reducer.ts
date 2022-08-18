import { CreateArticleStateInterface } from '../state/createArticle.state'
import * as articleAction from '../actions/createArticle.actions'
import { Action, createReducer, on } from '@ngrx/store'

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
}
const createArticleReducer = createReducer(
  initialState,
  on(
    articleAction.createArticleAction,
    (state): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: true,
    }),
  ),
  on(
    articleAction.createArticleSuccessAction,
    (state): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false,
    }),
  ),
  on(
    articleAction.createArticleFailureAction,
    (state, action): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      //validationErrors: action.errors,
    }),
  ),
)

export function createArticleReducers(
  state: CreateArticleStateInterface,
  action: Action,
) {
  return createArticleReducer(state, action)
}
