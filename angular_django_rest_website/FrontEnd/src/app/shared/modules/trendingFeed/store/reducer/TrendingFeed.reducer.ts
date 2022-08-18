import { routerNavigationAction } from '@ngrx/router-store'
import { Action, createReducer, on } from '@ngrx/store'

import * as feedActions from '../actions/getTrendingFeed.actions'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'

export interface State extends EntityState<ArticlesInterface> {
  // additional entities state properties
  isLoading: boolean
  error: string | null
  articleCount: number
}
export const adapter: EntityAdapter<ArticlesInterface> = createEntityAdapter<
  ArticlesInterface
>()
export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  error: null,
  articleCount: 0,
})

export const TrendingFeedReducer = createReducer(
  initialState,
  on(feedActions.getTrendingFeedSuccesAction, (state, action) => {
    state = Object.assign({
      ...state,
      isLoading: false,
      articleCount: action.articleCount,
      error: null,
    })
    return adapter.addMany(action.TrendingFeed, state)
  }),
  on(feedActions.getTrendingFeedAction, (state) => {
    //state = Object.assign({ ...state, isLoading: true, error: null}),
    return adapter.removeAll({ ...state, isLoading: true, error: null })
  }),
  on(feedActions.getTrendingFeedFailureAction, (state, action) =>
    Object.assign({ ...state, isLoading: false, error: action.errorMessage }),
  ),
)
