import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { TrendingFeedService } from '../../services/TrendingFeed.service'
import { GetTrendingFeedResponceInterface } from '../../interfaces/getTrendingFeedResponce.interface'
import {
  getTrendingFeedAction,
  getTrendingFeedFailureAction,
  getTrendingFeedSuccesAction,
} from '../actions/getTrendingFeed.actions'
import { Router } from '@angular/router'

/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class GetTrendingFeedEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTrendingFeedAction),
      switchMap(({ url }) => {
        return this.trendingFeedService.getFeed(url).pipe(
          map((data: GetTrendingFeedResponceInterface) =>
            getTrendingFeedSuccesAction({
              TrendingFeed: data.articles,
              articleCount: data.articleCount,
            }),
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(getTrendingFeedFailureAction(errorResponse.error)),
          ),
        )
      }),
    ),
  )
  redirectAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getTrendingFeedFailureAction),
        tap(() => {
          //this.router.navigate(['404'])
        }),
      ),
    { dispatch: false },
  )
  constructor(
    private actions$: Actions,
    private trendingFeedService: TrendingFeedService,
    private router: Router,
  ) {}
}
