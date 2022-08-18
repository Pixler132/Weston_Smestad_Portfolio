import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { GetTrendingFeedResponceInterface } from '../interfaces/getTrendingFeedResponce.interface'

@Injectable()
export class TrendingFeedService {
  constructor(private http: HttpClient) {}
  getFeed(url: string): Observable<GetTrendingFeedResponceInterface> {
    const fullUrl = environment.baseUrl + url
    return this.http.get<GetTrendingFeedResponceInterface>(fullUrl)
  }
}
