import { createAction, props } from '@ngrx/store'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { GetFeedResponceInterface } from '../../interfaces/getFeedResponce.interface'
import { ActionTypes } from './feed.types.actions'

export const getFeedAction = createAction(
  ActionTypes.GET_FEED,
  props<{ url: string }>(),
)
export const getFeedSuccesAction = createAction(
  ActionTypes.GET_FEED_SUCCESS,
  props<{ feed: ArticlesInterface[]; articleCount: number }>(),
)
export const getFeedFailureAction = createAction(
  ActionTypes.GET_FEED_FAILURE,
  props<{ errorMessage: string }>(),
)
