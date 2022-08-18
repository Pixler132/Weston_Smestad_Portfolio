import { GetFavoriteFeedResponceInterface } from '../../interfaces/getFavoriteFeedResponce.interface'

export interface FavoriteFeedStateInterface {
  isLoading: boolean
  error: string | null
  data: GetFavoriteFeedResponceInterface | null
}
