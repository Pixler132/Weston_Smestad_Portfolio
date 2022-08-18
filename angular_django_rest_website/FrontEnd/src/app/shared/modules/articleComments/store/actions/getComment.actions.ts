import { createAction, props } from '@ngrx/store'
import { CommentInterface } from 'src/app/shared/interfaces/comment.interface'

import { ActionTypes } from './comment.types.actions'

export const getCommentAction = createAction(
  ActionTypes.GET_COMMENT,
  props<{ url: string }>(),
)
export const getCommentSuccesAction = createAction(
  ActionTypes.GET_COMMENT_SUCCESS,
  props<{ comment: CommentInterface }>(),
)
export const getCommentFailureAction = createAction(
  ActionTypes.GET_COMMENT_FAILURE,
)
