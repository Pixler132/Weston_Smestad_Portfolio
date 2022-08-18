import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment'
import { ArticlesInterface } from '../interfaces/articles.interface'
import { GetArticleResponseInterface } from '../interfaces/getArticleResponse.interface'
import { Store, select } from '@ngrx/store'
import { isLoggedInSelector } from 'src/app/pages/auth/store/selectors/auth.selectors'

@Injectable()
export class ArticleService {
  loggedIn$!: Observable<boolean>
  fullUrl: string
  constructor(private http: HttpClient, private store: Store) {
    this.fullUrl = ''
  }
  getArticle(title: string): Observable<ArticlesInterface> {
    this.fullUrl =
      environment.baseUrl + environment.getArticleApiUrl + `${title}/`

    return this.http.get<GetArticleResponseInterface>(this.fullUrl).pipe(
      map((response: GetArticleResponseInterface) => {
        return response.article
      }),
    )
  }
  onFavorite(id: number, type: boolean): Observable<{}> {
    const url = environment.baseUrl + environment.favoriteApiUrl + `${id}/`
    if (type === true) {
      console.log(type)
      return this.http.delete<{}>(url).pipe()
    } else {
      console.log(type)
      return this.http.get<{}>(url).pipe()
    }
  }
}
