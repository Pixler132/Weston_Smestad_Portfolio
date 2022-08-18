import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ArticleInputInterface } from 'src/app/shared/interfaces/articleInput.interface'

import { environment } from 'src/environments/environment'

import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { GetArticleResponseInterface } from 'src/app/shared/interfaces/getArticleResponse.interface'

@Injectable()
export class CreateArticleService {
  constructor(private http: HttpClient) {}
  createArticle(
    articleInput: ArticleInputInterface,
  ): Observable<ArticlesInterface> {
    const url = environment.baseUrl + environment.createArticleApiUrl
    //'/playground/importantData/' //
    return this.http
      .post<GetArticleResponseInterface>(url, { article: articleInput })
      .pipe(
        map((response: GetArticleResponseInterface) => {
          return response.article
        }),
      )
  }
}
