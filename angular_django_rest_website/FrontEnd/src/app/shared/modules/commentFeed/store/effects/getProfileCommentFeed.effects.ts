import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'

import { Router } from '@angular/router'
import { CommenetFeedService } from '../../services/commentFeed.service'
import {
  getCommentFeedAction,
  getCommentFeedFailureAction,
  getCommentFeedSuccesAction,
} from '../actions/getCommentFeed.actions'
import { GetFeedResponceInterface } from '../../../feed/interfaces/getFeedResponce.interface'
import { GetCommentFeedResponceInterface } from '../../interfaces/getCommentFeedResponce.interface'

/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class GetCommentFeedEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCommentFeedAction),
      switchMap(({ url }) => {
        return this.commentFeedService.getCommentFeed(url).pipe(
          map((data: GetCommentFeedResponceInterface) =>
            getCommentFeedSuccesAction({
              comments: data.comments,
            }),
          ),
          tap((d) => console.log(typeof d.comments)),
          catchError((errorResponse: HttpErrorResponse) =>
            of(getCommentFeedFailureAction(errorResponse.error)),
          ),
        )
      }),
    ),
  )
  // redirectAfterDelete$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(getFeedFailureAction),
  //       tap(() => {
  //         //this.router.navigate(['404'])
  //       }),
  //     ),
  //   { dispatch: false },
  // )
  constructor(
    private actions$: Actions,
    private commentFeedService: CommenetFeedService,
    private router: Router,
  ) {}
}
