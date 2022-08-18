import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'

export interface GetCommentFeedResponceInterface {
  comments: ProfileComment[]
}
export interface ProfileComment {
  id: number
  article: article
  content: string
  created_at: Date
  updated_at: Date
}
interface article {
  title: String
  urlGen: String
}
