import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'
import { AuthRegistrationRequestInterface } from '../interfaces/auth.registration.request.interface'
import { LoginRequestInterface } from '../interfaces/auth.login.request.interface'
import { CurrentUserInputInterface } from 'src/app/shared/interfaces/currrentUserInputInterface'
import { AuthUpdateInterface } from '../interfaces/authUpdate.interface'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: CurrentUserInterface) {
    return response
  }
  register(
    data: AuthRegistrationRequestInterface,
  ): Observable<CurrentUserInterface> {
    const url = environment.baseUrl + environment.authRegisterApiUrl
    return this.http
      .post<CurrentUserInterface>(url, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.baseUrl + environment.authLoginApiUrl

    return this.http
      .post<CurrentUserInterface>(url, data)
      .pipe(map(this.getUser))
  }
  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.baseUrl + environment.authAutoLoginApiUrl
    return this.http.get<CurrentUserInterface>(url).pipe(map(this.getUser))
  }
  updateCurrentUser(
    data: AuthUpdateInterface,
  ): Observable<CurrentUserInterface> {
    const url = environment.baseUrl + '/usermanagement/profileUpdate/'
    return this.http
      .put<CurrentUserInterface>(url, data)
      .pipe(map(this.getUser))
  }

  logout() {
    const url = environment.baseUrl + environment.authLogoutApiUrl
    return this.http.get(url)
  }
  validateEmail(url: string) {
    const fullUrl = environment.baseUrl + '/playground/' + url
    console.log(fullUrl)
    return this.http.get(fullUrl)
  }
}
/*
 AuthResponseInterface is type being returned
 LoginRequestInterface is type being sent
*/
