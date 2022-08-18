// import { routerNavigationAction } from '@ngrx/router-store'
// import { Action, createReducer, on } from '@ngrx/store'
// //import { FeedStateInterface } from '../state/feed.state'
// import {
//   getFeedAction,
//   getFeedFailureAction,
//   getFeedSuccesAction,
// } from '../actions/getTags.actions'

// const initialState: FeedStateInterface = {
//   data: null,
//   isLoading: false,
//   error: null,
// }

// const feedReducer = createReducer(
//   initialState,
//   // on(
//   //   getFeedAction,
//   //   (state): FeedStateInterface => ({
//   //     ...state,
//   //     isLoading: true,
//   //   }),
//   // ),
//   // on(
//   //   getFeedSuccesAction,
//   //   (state, action): FeedStateInterface => ({
//   //     ...state,
//   //     isLoading: false,
//   //     data: action.feed,
//   //   }),
//   // ),
//   // on(
//   //   getFeedFailureAction,
//   //   (state, action): FeedStateInterface => ({
//   //     ...state,
//   //     isLoading: false,
//   //   }),
//   // ),
//   on(routerNavigationAction, (): FeedStateInterface => initialState),
// )

// export function reducers(state: FeedStateInterface, action: Action) {
//   return feedReducer(state, action)
// }
