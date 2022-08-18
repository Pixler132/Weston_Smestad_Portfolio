export interface CurrentUserInterface {
  currentUser: {
    id: number
    userName: string
    image: string
    bio: string
    firstName: string
    lastName: string | null
    email: string
    joinDate: string
    token: string

    admin: boolean
    owner: boolean
    age: number
    settings: Settings
  }
}
interface Settings {
  lightMode: boolean
  bio: boolean
  email: boolean
  age: boolean
  comments: boolean
  Favorite: boolean
}
