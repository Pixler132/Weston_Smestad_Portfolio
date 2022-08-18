import { createAction, props } from '@ngrx/store'
import {
  GetCommentFeedResponceInterface,
  ProfileComment,
} from '../../interfaces/getCommentFeedResponce.interface'

import { ActionTypes } from './commentFeed.types.actions'

export const getCommentFeedAction = createAction(
  ActionTypes.GET_COMMENT_FEED,
  props<{ url: string }>(),
)
export const getCommentFeedSuccesAction = createAction(
  ActionTypes.GET_COMMENT_FEED_SUCCESS,
  props<{ comments: ProfileComment[] }>(),
)
export const getCommentFeedFailureAction = createAction(
  ActionTypes.GET_COMMENT_FEED_FAILURE,
  props<{ errorMessage: string }>(),
)
