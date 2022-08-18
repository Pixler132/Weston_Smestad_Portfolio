import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap, tap } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { of } from 'rxjs'
import {
  createArticleAction,
  createArticleSuccessAction,
  createArticleFailureAction,
} from '../actions/createArticle.actions'
import { CreateArticleService } from '../../services/createArticle.service'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'

@Injectable()
export class CreateArticleEffect {
  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({ articleInput }) => {
        return this.createArticleService.createArticle(articleInput).pipe(
          map((article: ArticlesInterface) => {
            console.log(article)
            return createArticleSuccessAction({ article })
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createArticleFailureAction(),
              // {
              //   errors: errorResponse.error.errors,
              // }
            )
          }),
        )
      }),
    ),
  )

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(['/article', article.urlGen])
        }),
      ),
    { dispatch: false },
  )

  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router,
  ) {}
}
