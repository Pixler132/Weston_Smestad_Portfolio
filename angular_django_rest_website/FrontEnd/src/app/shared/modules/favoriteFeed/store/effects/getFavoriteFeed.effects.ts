import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'

import { Router } from '@angular/router'
import { GetFavoriteFeedResponceInterface } from '../../interfaces/getFavoriteFeedResponce.interface'
import { FavoriteFeedService } from '../../services/commentFeed.service'
import {
  getFavoriteFeedAction,
  getFavoriteFeedSuccesAction,
  getFavoriteFeedFailureAction,
} from '../actions/getFavoriteFeed.actions'

/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class GetFavoriteFeedEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFavoriteFeedAction),
      switchMap(({ url }) => {
        return this.favoriteFeedService.getFavoriteFeed(url).pipe(
          map((data: GetFavoriteFeedResponceInterface) =>
            getFavoriteFeedSuccesAction({
              favorites: data.articles,
            }),
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(getFavoriteFeedFailureAction(errorResponse.error)),
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
    private favoriteFeedService: FavoriteFeedService,
    private router: Router,
  ) {}
}
