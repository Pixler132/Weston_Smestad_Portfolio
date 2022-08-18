import { ArticleBlockInterface } from './articleBlock.interface'

export interface ArticleInputInterface {
  tags: string[]
  articleDescription: string
  articleTitle: string
  articleImage: string | null
  content: ArticleBlockInterface[]
}
