import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { ArticleService as ShardedArticleService } from 'src/app/shared/services/article.service'

import { of } from 'rxjs'
import { switchMap, map, catchError } from 'rxjs/operators'

import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '../actions/getArticle.actions'

@Injectable()
export class GetArticleEffect {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({ title }) => {
        return this.sharedArticleService.getArticle(title).pipe(
          map((article: ArticlesInterface) => {
            console.log(article)

            return getArticleSuccessAction({ article })
          }),
          catchError(() => {
            return of(getArticleFailureAction())
          }),
        )
      }),
    ),
  )

  constructor(
    private actions$: Actions,
    private sharedArticleService: ShardedArticleService,
  ) {}
}
