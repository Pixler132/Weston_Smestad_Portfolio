import { AurthorInterface } from './author.interface'

export interface CommentInterface {
  commentFeed: {
    comments: CommentArrayInterface[] | null
    commentCount: number
  }
}
export interface CommentArrayInterface {
  author: AurthorInterface | null
  comment_id: number | null
  content: string
  creationDate: Date | null
  updatedDate: Date | null
  replies: CommentArrayInterface[] | null
}
