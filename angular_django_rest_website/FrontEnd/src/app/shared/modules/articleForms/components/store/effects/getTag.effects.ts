import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'

import { GetAvailableTagsService } from '../../../services/tagSelector.service'
import {
  getTagAction,
  getTagFailureAction,
  getTagSuccessAction,
} from '../actions/getTags.actions'

/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class GetTagEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTagAction),
      switchMap(() => {
        return this.getAvailableTagsService.getAvailableTags().pipe(
          map((tags: any) => {
            console.log(tags)
            return getTagSuccessAction({ tags })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log(errorResponse)
            return of(getTagFailureAction())
          }),
        )
      }),
    ),
  )

  constructor(
    private actions$: Actions,
    private getAvailableTagsService: GetAvailableTagsService,
  ) {}
}
