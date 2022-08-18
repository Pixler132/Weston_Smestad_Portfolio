import { createAction, props } from '@ngrx/store'
import {
  CommentArrayInterface,
  CommentInterface,
} from 'src/app/shared/interfaces/comment.interface'

import { ActionTypes } from './comment.types.actions'

export const postCommentReplyAction = createAction(
  ActionTypes.POST_COMMENT_REPLY,
  props<{ url: string; comment: any; reply: any }>(),
)
export const postCommentReplySuccessAction = createAction(
  ActionTypes.POST_COMMENT_REPLY_SUCCESS,
  props<{ comment: CommentInterface }>(),
)
export const postCommentReplyFailureAction = createAction(
  ActionTypes.POST_COMMENT_REPLY_FAILURE,
)
