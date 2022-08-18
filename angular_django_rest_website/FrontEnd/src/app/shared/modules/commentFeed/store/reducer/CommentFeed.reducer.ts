import { createReducer, on } from '@ngrx/store'
import * as feedActions from '../actions/getCommentFeed.actions'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import {
  GetCommentFeedResponceInterface,
  ProfileComment,
} from '../../interfaces/getCommentFeedResponce.interface'

export interface State extends EntityState<ProfileComment> {
  // additional entities state properties
  isLoading: boolean
  error: string | null
}
export const adapter: EntityAdapter<ProfileComment> = createEntityAdapter<
  ProfileComment
>()
export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  error: null,
})

export const CommentFeedReducer = createReducer(
  initialState,
  on(feedActions.getCommentFeedSuccesAction, (state, comment) => {
    state = Object.assign({
      ...state,
      isLoading: false,
      error: null,
    })
    console.log(typeof comment.comments)
    return adapter.addMany(comment.comments, state)
  }),
  on(feedActions.getCommentFeedAction, (state) => {
    //state = Object.assign({ ...state, isLoading: true, error: null}),
    return adapter.removeAll({ ...state, isLoading: true, error: null })
  }),
  on(feedActions.getCommentFeedFailureAction, (state, action) =>
    Object.assign({ ...state, isLoading: false, error: action.errorMessage }),
  ),
)
