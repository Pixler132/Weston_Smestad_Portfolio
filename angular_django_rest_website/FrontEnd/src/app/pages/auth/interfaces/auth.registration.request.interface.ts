export interface AuthRegistrationRequestInterface {
  user: {
    firstName: String
    lastName: String | null
    userName: String
    password: String
    email: String
  }
}
