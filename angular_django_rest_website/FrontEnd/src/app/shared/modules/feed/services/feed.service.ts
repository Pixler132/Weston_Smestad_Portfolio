import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { GetFeedResponceInterface } from '../interfaces/getFeedResponce.interface'

@Injectable()
export class FeedService {
  constructor(private http: HttpClient) {}
  getFeed(url: string): Observable<GetFeedResponceInterface> {
    const fullUrl = environment.baseUrl + url
    return this.http.get<GetFeedResponceInterface>(fullUrl)
  }
}
