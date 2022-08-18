import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import { Router } from '@angular/router'

import {
  deleteArticleAction,
  deleteArticleSuccessAction,
  deleteArticleFailureAction,
} from '../actions/deleteArticle.actions'
import { DeleteArticleService } from '../../services/article.service'

@Injectable()
export class DeleteArticleEffect {
  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArticleAction),
      switchMap(({ title }) => {
        return this.deleteArticleService
          .deleteArticle(title.split(' ').join('-'))
          .pipe(
            map(() => {
              return deleteArticleSuccessAction()
            }),
            catchError(() => {
              return of(deleteArticleFailureAction())
            }),
          )
      }),
    ),
  )
  // redirectAfterDelete$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(deleteArticleSuccessAction),
  //       tap(() => {
  //         this.router.navigate(['/'])
  //       }),
  //     ),
  //   { dispatch: false },
  //)
  constructor(
    private actions$: Actions,
    private deleteArticleService: DeleteArticleService,
    private router: Router,
  ) {}
}
