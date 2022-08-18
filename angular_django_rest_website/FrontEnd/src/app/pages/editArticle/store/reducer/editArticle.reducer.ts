import { EditArticleStateInterface } from '../state/editArticle.state'
import * as updateArticleAction from '../actions/updateArticle.actions'
import { Action, createReducer, on } from '@ngrx/store'
import * as getArticleAction from '../actions/getArticle.actions'
import { routerNavigationAction } from '@ngrx/router-store/src/actions'

const initialState: EditArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
  article: null,
  isLoading: false,
}
const EditArticleReducers = createReducer(
  initialState,
  on(
    updateArticleAction.updateArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: true,
    }),
  ),
  on(
    updateArticleAction.updateArticleSuccessAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
    }),
  ),
  on(
    updateArticleAction.updateArticleFailureAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }),
  ),
  on(
    getArticleAction.getArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getArticleAction.getArticleSuccessAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
      article: action.article,
    }),
  ),
  on(
    getArticleAction.getArticleFailureAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
  on(
    updateArticleAction.saveArticleAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
      article: action.article,
    }),
  ),
  //on(routerNavigationAction, (): EditArticleStateInterface => initialState),
)

export function EditArticleReducer(
  state: EditArticleStateInterface,
  action: Action,
) {
  return EditArticleReducers(state, action)
}
