import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'

export interface CreateArticleStateInterface {
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
