import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommentInterface } from 'src/app/shared/interfaces/comment.interface'
import { environment } from 'src/environments/environment'

@Injectable()
export class CommentService {
  constructor(private http: HttpClient) {}
  getComment(url: string): Observable<CommentInterface> {
    const fullUrl = environment.baseUrl + url

    return this.http.get<CommentInterface>(fullUrl)
  }
  updateComment(
    url: string,
    data: CommentInterface,
  ): Observable<CommentInterface> {
    console.warn('updateComment need update for comment reply')
    const fullUrl = environment.baseUrl + url
    return this.http.put<CommentInterface>(fullUrl, { comment: data })
  }
  deleteComment(url: string): Observable<CommentInterface> {
    const fullUrl = environment.baseUrl + url
    return this.http.delete<CommentInterface>(fullUrl)
  }
  postComment(
    url: string,
    data: CommentInterface,
  ): Observable<CommentInterface> {
    const fullUrl = environment.baseUrl + url
    console.warn(data)

    return this.http.post<CommentInterface>(fullUrl, {
      comment: data,
    })
  }
  postReplyComment(
    url: string,
    data: CommentInterface,
    reply: any,
  ): Observable<CommentInterface> {
    const fullUrl = environment.baseUrl + url
    console.warn(data)

    return this.http.post<CommentInterface>(fullUrl, {
      comment: data,
      reply: reply,
    })
  }
}
