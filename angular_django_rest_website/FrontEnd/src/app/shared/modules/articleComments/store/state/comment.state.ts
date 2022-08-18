import { CommentInterface } from 'src/app/shared/interfaces/comment.interface'

export interface CommentStateInterface {
  isLoading: boolean
  error: string | null
  data: CommentInterface | null
}
