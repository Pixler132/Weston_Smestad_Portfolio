export interface AuthUpdateInterface {
  user: {
    password: updatepassword | undefined
    email: updateEmail | undefined
    bio: updateBio | undefined
    userName: updateUserName | undefined
    image: updateImage | undefined
    lastName: updateLastName | undefined
    firstName: updateFirstName | undefined
  }
}
interface updateEmail {
  newEmail: string
}
interface updatepassword {
  newPassword: string
  confirmPassword: string
  oldPassword: string
}
interface updateBio {
  newBio: string
}
interface updateImage {
  newImage: string
}
interface updateUserName {
  newUserName: string
}
interface updateFirstName {
  newFirstName: string
}
interface updateLastName {
  newLastName: string
}
