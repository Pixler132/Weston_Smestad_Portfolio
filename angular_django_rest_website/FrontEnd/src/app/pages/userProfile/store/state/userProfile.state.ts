import { UserProfileInterface } from '../../interfaces/userProfile.interface'

export interface UserProfileStateInterface {
  data: UserProfileInterface | null
  isLoading: boolean
  error: string | null
}
