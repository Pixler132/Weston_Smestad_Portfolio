import { routerNavigationAction } from '@ngrx/router-store'
import { Action, createReducer, on } from '@ngrx/store'
import { CommentStateInterface } from '../state/comment.state'
import {
  getCommentAction,
  getCommentFailureAction,
  getCommentSuccesAction,
} from '../actions/getComment.actions'
import {
  updateCommentAction,
  updateCommentFailureAction,
  updateCommentSuccessAction,
} from '../actions/updateComment.actions'
import {
  postCommentAction,
  postCommentFailureAction,
  postCommentSuccessAction,
} from '../actions/postComment.actions'
import {
  deleteCommentAction,
  deleteCommentSuccesAction,
  deleteCommentFailureAction,
} from '../actions/deleteComment.actions'

const initialState: CommentStateInterface = {
  data: null,
  isLoading: false,
  error: null,
}

const CommentReducer = createReducer(
  initialState,
  on(
    getCommentAction,
    (state): CommentStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getCommentSuccesAction,
    (state, action): CommentStateInterface => ({
      ...state,
      isLoading: false,
      data: action.comment,
    }),
  ),
  on(
    getCommentFailureAction,
    (state, action): CommentStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
  //********************************************* */
  on(
    updateCommentAction,
    (state, action): CommentStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    updateCommentSuccessAction,
    (state, action): CommentStateInterface => ({
      ...state,
      data: action.comment,
      isLoading: false,
    }),
  ),
  on(
    updateCommentFailureAction,
    (state, action): CommentStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
  //********************************************* */

  on(
    postCommentAction,
    (state, action): CommentStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    postCommentSuccessAction,
    (state, action): CommentStateInterface => ({
      ...state,
      data: action.comment,
      isLoading: false,
    }),
  ),
  on(
    postCommentFailureAction,
    (state, action): CommentStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
  on(
    deleteCommentAction,
    (state): CommentStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    deleteCommentSuccesAction,
    (state, action): CommentStateInterface => ({
      ...state,
      isLoading: false,
      data: action.comment,
    }),
  ),
  on(
    deleteCommentFailureAction,
    (state, action): CommentStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
  on(routerNavigationAction, (): CommentStateInterface => initialState),
)

export function reducers(state: CommentStateInterface, action: Action) {
  return CommentReducer(state, action)
}
