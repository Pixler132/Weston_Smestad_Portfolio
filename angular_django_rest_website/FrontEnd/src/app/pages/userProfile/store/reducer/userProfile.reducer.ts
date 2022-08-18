import { createReducer, on, Action } from '@ngrx/store'
import {
  getUserProfileAction,
  getUserProfileSuccessAction,
  getUserProfileFailureAction,
} from '../actions/getUserProfile.actions'
import { UserProfileStateInterface } from '../state/userProfile.state'

const initialState: UserProfileStateInterface = {
  data: null,
  isLoading: false,
  error: null,
}

const userProfileReducer = createReducer(
  initialState,
  on(
    getUserProfileAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getUserProfileSuccessAction,
    (state, action): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    }),
  ),
  on(
    getUserProfileFailureAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
)

export function reducers(state: UserProfileStateInterface, action: Action) {
  return userProfileReducer(state, action)
}
