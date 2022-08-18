import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'

export interface GetFavoriteFeedResponceInterface {
  articles: FavoriteArticle[]
}
export interface FavoriteArticle {
  id: number
  author: author
  creationDate: Date
  favorited: boolean
  favoriteCount: number
  tags: string[]
  articleImage: string
  articleDescription: string
  articleTitle: string
  urlGen: string
}
interface author {
  authorId: number
  username: string
  profileImg: string
}
