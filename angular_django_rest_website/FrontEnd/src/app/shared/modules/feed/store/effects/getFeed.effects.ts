import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { FeedService } from '../../services/feed.service'
import { GetFeedResponceInterface } from '../../interfaces/getFeedResponce.interface'
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccesAction,
} from '../actions/getFeed.actions'
import { Router } from '@angular/router'

/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class GetFeedEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((data: GetFeedResponceInterface) =>
            getFeedSuccesAction({
              feed: data.articles,
              articleCount: data.articleCount,
            }),
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(getFeedFailureAction(errorResponse.error)),
          ),
        )
      }),
    ),
  )
  redirectAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getFeedFailureAction),
        tap(() => {
          //this.router.navigate(['404'])
        }),
      ),
    { dispatch: false },
  )
  constructor(
    private actions$: Actions,
    private feedService: FeedService,
    private router: Router,
  ) {}
}
