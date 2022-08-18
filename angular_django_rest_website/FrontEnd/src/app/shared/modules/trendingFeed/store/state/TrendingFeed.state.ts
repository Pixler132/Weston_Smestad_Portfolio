import { GetTrendingFeedResponceInterface } from '../../interfaces/getTrendingFeedResponce.interface'

export interface TrendingFeedStateInterface {
  isLoading: boolean
  error: string | null
  data: GetTrendingFeedResponceInterface | null
}
