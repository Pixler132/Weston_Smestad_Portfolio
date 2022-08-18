import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'

export interface EditArticleStateInterface {
  article: ArticlesInterface | null
  isLoading: boolean
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
