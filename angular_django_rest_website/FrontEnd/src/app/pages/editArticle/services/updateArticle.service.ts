import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ArticleInputInterface } from 'src/app/shared/interfaces/articleInput.interface'

import { environment } from 'src/environments/environment'

import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { SaveArticleResponseInterface } from 'src/app/shared/interfaces/saveArticleResponse.interface'

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}
  updateArticle(
    title: string,
    articleInput: ArticleInputInterface,
  ): Observable<ArticlesInterface> {
    const fullUrl =
      environment.baseUrl + environment.editArticleApiUrl + `${title}/`

    return this.http
      .put<SaveArticleResponseInterface>(fullUrl, { article: articleInput })
      .pipe(
        map((response: SaveArticleResponseInterface) => {
          return response.article
        }),
      )
  }
}
