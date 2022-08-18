import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { PersistanceService } from 'src/app/shared/services/persistance.service'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'
import { AuthService } from '../../services/auth.service'
import {
  getCurrentUserAction,
  getCurrentUserSuccessAction,
  getCurrentUserFailureAction,
} from '../actions/auth.getCurrentUser.actions'
import { Router } from '@angular/router'
import { updateCurrentUserFailureAction } from '../actions/auth.updateCurrentUserData.actions'
/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistanceService.get('accessToken')
        if (!token) {
          return of(getCurrentUserFailureAction())
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set(
              'accessToken',
              currentUser.currentUser.token,
            )
            return getCurrentUserSuccessAction({ currentUser })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log(errorResponse)
            if (errorResponse.error.detail === 'Invalid token.') {
              this.persistanceService.set('accessToken', '')
            }
            return of(getCurrentUserFailureAction())
          }),
        )
      }),
    ),
  )
  // redirectAfterSubmit$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(getCurrentUserFailureAction),
  //       tap(() => {
  //         this.router.navigateByUrl('/')
  //       }),
  //     ),
  //   { dispatch: false },
  //)
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router,
  ) {}
}
