import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { GetCommentFeedResponceInterface } from '../interfaces/getCommentFeedResponce.interface'

@Injectable()
export class CommenetFeedService {
  constructor(private http: HttpClient) {}
  getCommentFeed(url: string): Observable<GetCommentFeedResponceInterface> {
    const fullUrl = environment.baseUrl + url
    return this.http.get<GetCommentFeedResponceInterface>(fullUrl)
  }
}
