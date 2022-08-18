import { createAction, props } from '@ngrx/store'
import { CommentInterface } from 'src/app/shared/interfaces/comment.interface'

import { ActionTypes } from './comment.types.actions'

export const deleteCommentAction = createAction(
  ActionTypes.DELETE_COMMENT,
  props<{ url: string }>(),
)
export const deleteCommentSuccesAction = createAction(
  ActionTypes.DELETE_COMMENT_SUCCESS,
  props<{ comment: CommentInterface }>(),
)
export const deleteCommentFailureAction = createAction(
  ActionTypes.DELETE_COMMENT_FAILURE,
)
