import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { GetFavoriteFeedResponceInterface } from '../interfaces/getFavoriteFeedResponce.interface'

@Injectable()
export class FavoriteFeedService {
  constructor(private http: HttpClient) {}
  getFavoriteFeed(url: string): Observable<GetFavoriteFeedResponceInterface> {
    const fullUrl = environment.baseUrl + url
    return this.http.get<GetFavoriteFeedResponceInterface>(fullUrl)
  }
}
