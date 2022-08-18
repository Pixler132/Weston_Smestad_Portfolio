import { GetCommentFeedResponceInterface } from '../../interfaces/getCommentFeedResponce.interface'

export interface CommentFeedStateInterface {
  isLoading: boolean
  error: string | null
  data: GetCommentFeedResponceInterface | null
}
