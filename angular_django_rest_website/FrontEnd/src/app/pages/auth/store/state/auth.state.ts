import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'

export interface AuthStateInterface {
  isSubmitting: boolean
  currentUser: CurrentUserInterface | null
  isLoggedIn: boolean | null
  validationErrors: BackendErrorsInterface | null
  isLoading: boolean
  isAdmin: boolean | null
  isOwner: boolean | null
}
