import { createAction, props } from '@ngrx/store'
import { FavoriteArticle } from '../../interfaces/getFavoriteFeedResponce.interface'

import { ActionTypes } from './favoriteFeed.types.actions'

export const getFavoriteFeedAction = createAction(
  ActionTypes.GET_FAVORITE_FEED,
  props<{ url: string }>(),
)
export const getFavoriteFeedSuccesAction = createAction(
  ActionTypes.GET_FAVORITE_FEED_SUCCESS,
  props<{ favorites: FavoriteArticle[] }>(),
)
export const getFavoriteFeedFailureAction = createAction(
  ActionTypes.GET_FAVORITE_FEED_FAILURE,
  props<{ errorMessage: string }>(),
)
