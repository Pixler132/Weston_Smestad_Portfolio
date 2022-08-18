import { ArticleBlockInterface } from './articleBlock.interface'
import { AurthorInterface } from './author.interface'

export interface ArticlesInterface {
  id: number
  author: AurthorInterface
  creationDate: Date | null
  favorited: boolean
  favoriteCount: number
  tags: string[]
  articleDescription: string
  articleTitle: string
  articleImage: string | null
  urlGen: string
  content: ArticleBlockInterface[] | null
}
/*

  position: number

  type: number


*/
