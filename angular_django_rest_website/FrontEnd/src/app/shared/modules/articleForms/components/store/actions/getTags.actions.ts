import { createAction, props } from '@ngrx/store'

import { ActionTypes } from './tags.types.actions'

export const getTagAction = createAction(ActionTypes.GET_TAGS)
export const getTagSuccessAction = createAction(
  ActionTypes.GET_TAGS_SUCCESS,
  props<{ tags: any }>(), //todo
)
export const getTagFailureAction = createAction(ActionTypes.GET_TAGS_FAILURE)
