import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'

export interface ArticleStateInterface {
  isLoading: boolean
  error: string | null
  data: ArticlesInterface | null
  isFavoriting: boolean
}
