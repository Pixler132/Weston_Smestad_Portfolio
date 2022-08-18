import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { map } from 'rxjs/operators'
import { GetUserProfileResponseInterface } from '../interfaces/getUserProfileResponse.interface'
import { UserProfileInterface } from '../interfaces/userProfile.interface'

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<UserProfileInterface> {
    const url =
      `${environment.baseUrl}${environment.profileApiUrl}` + slug + '/'

    return this.http
      .get<GetUserProfileResponseInterface>(url)
      .pipe(
        map((response: GetUserProfileResponseInterface) => response.profile),
      )
  }
}
