import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Router } from '@angular/router'

import { of } from 'rxjs'
import { switchMap, map, catchError, tap } from 'rxjs/operators'

import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { HttpErrorResponse } from '@angular/common/http'
import { EditArticleService } from '../../services/updateArticle.service'
import {
  updateArticleAction,
  updateArticleSuccessAction,
  updateArticleFailureAction,
} from '../actions/updateArticle.actions'

@Injectable()
export class UpdateArticleEffect {
  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({ title, articleInput }) => {
        return this.editArticleService
          .updateArticle(`${title}`, articleInput)
          .pipe(
            map((article: ArticlesInterface) => {
              return updateArticleSuccessAction({ article })
            }),

            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                updateArticleFailureAction({
                  errors: errorResponse.error.errors,
                }),
              )
            }),
          )
      }),
    ),
  )

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({ article }) => {
          const title = article.urlGen
          this.router.navigate(['/article', title])
        }),
      ),
    { dispatch: false },
  )

  constructor(
    private actions$: Actions,
    private editArticleService: EditArticleService,
    private router: Router,
  ) {}
}
