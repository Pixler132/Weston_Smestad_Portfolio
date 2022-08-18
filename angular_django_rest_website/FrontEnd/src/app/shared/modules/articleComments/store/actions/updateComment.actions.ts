import { createAction, props } from '@ngrx/store'
import { CommentInterface } from 'src/app/shared/interfaces/comment.interface'

import { ActionTypes } from './comment.types.actions'

export const updateCommentAction = createAction(
  ActionTypes.UPDATE_COMMENT,
  props<{ url: string; comment: CommentInterface }>(),
)
export const updateCommentSuccessAction = createAction(
  ActionTypes.UPDATE_COMMENT_SUCCESS,
  props<{ comment: CommentInterface }>(),
)
export const updateCommentFailureAction = createAction(
  ActionTypes.UPDATE_COMMENT_FAILURE,
)
