import { createReducer, on } from '@ngrx/store'
import * as feedActions from '../actions/getFavoriteFeed.actions'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { FavoriteArticle } from '../../interfaces/getFavoriteFeedResponce.interface'

export interface State extends EntityState<FavoriteArticle> {
  // additional entities state properties
  isLoading: boolean
  error: string | null
}
export const adapter: EntityAdapter<FavoriteArticle> = createEntityAdapter<
  FavoriteArticle
>()
export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  error: null,
})

export const FavoriteFeedReducer = createReducer(
  initialState,
  on(feedActions.getFavoriteFeedSuccesAction, (state, favorite) => {
    state = Object.assign({
      ...state,
      isLoading: false,
      error: null,
    })
    console.log(typeof favorite.favorites)
    return adapter.addMany(favorite.favorites, state)
  }),
  on(feedActions.getFavoriteFeedAction, (state) => {
    //state = Object.assign({ ...state, isLoading: true, error: null}),
    return adapter.removeAll({ ...state, isLoading: true, error: null })
  }),
  on(feedActions.getFavoriteFeedFailureAction, (state, action) =>
    Object.assign({ ...state, isLoading: false, error: action.errorMessage }),
  ),
)
