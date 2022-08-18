import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service'
import {
  getArticleAction,
  getArticleSuccessAction,
  getArticleFailureAction,
} from '../actions/getArticle.actions'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { Router } from '@angular/router'

@Injectable()
export class GetArticleEffect {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({ title }) => {
        const newtitle = title.split(' ').join('-')
        console.warn(newtitle)
        return this.sharedArticleService.getArticle(title).pipe(
          //takes the slug add to a html string
          map((article: ArticlesInterface) => {
            return getArticleSuccessAction({ article })
          }),

          catchError(() => {
            return of(getArticleFailureAction())
          }),
        )
      }),
    ),
  )
  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getArticleFailureAction),
        tap(() => {
          this.router.navigateByUrl('/')
        }),
      ),
    { dispatch: false },
  )
  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService,
    private router: Router,
  ) {}
}
