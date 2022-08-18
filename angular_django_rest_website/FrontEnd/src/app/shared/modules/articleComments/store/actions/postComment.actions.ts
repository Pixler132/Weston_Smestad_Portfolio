import { createAction, props } from '@ngrx/store'
import {
  CommentArrayInterface,
  CommentInterface,
} from 'src/app/shared/interfaces/comment.interface'

import { ActionTypes } from './comment.types.actions'

export const postCommentAction = createAction(
  ActionTypes.POST_COMMENT,
  props<{ url: string; comment: CommentInterface }>(),
)
export const postCommentSuccessAction = createAction(
  ActionTypes.POST_COMMENT_SUCCESS,
  props<{ comment: CommentInterface }>(),
)
export const postCommentFailureAction = createAction(
  ActionTypes.POST_COMMENT_FAILURE,
)
