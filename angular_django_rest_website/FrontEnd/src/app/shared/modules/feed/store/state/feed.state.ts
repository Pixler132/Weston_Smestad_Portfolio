import { GetFeedResponceInterface } from '../../interfaces/getFeedResponce.interface'

export interface FeedStateInterface {
  isLoading: boolean
  error: string | null
  data: GetFeedResponceInterface | null
}
