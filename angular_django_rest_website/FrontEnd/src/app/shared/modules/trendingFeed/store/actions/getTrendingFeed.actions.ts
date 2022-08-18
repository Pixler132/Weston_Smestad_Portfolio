import { createAction, props } from '@ngrx/store'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { GetTrendingFeedResponceInterface } from '../../interfaces/getTrendingFeedResponce.interface'
import { ActionTypes } from './TrendingFeed.types.actions'

export const getTrendingFeedAction = createAction(
  ActionTypes.GET_TRENDING_FEED,
  props<{ url: string }>(),
)
export const getTrendingFeedSuccesAction = createAction(
  ActionTypes.GET_TRENDING_FEED_SUCCESS,
  props<{ TrendingFeed: ArticlesInterface[]; articleCount: number }>(),
)
export const getTrendingFeedFailureAction = createAction(
  ActionTypes.GET_TRENDING_FEED_FAILURE,
  props<{ errorMessage: string }>(),
)
