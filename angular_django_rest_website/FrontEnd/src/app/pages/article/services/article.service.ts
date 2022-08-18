import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable()
export class DeleteArticleService {
  constructor(private http: HttpClient) {}

  deleteArticle(title: string): Observable<{}> {
    const url =
      environment.baseUrl + environment.deleteArticleApiUrl + `${title}/`
    return this.http.delete<{}>(url)
  }
}
