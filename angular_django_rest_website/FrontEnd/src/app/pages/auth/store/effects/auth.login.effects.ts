import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { PersistanceService } from 'src/app/shared/services/persistance.service'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'
import { AuthService } from '../../services/auth.service'
import {
  emailValFailureAction,
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/auth.login.actions'
/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ payload }) => {
        return this.authService.login(payload).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set(
              'accessToken',
              currentUser.currentUser.token,
            )
            return loginSuccessAction({ currentUser })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log(errorResponse.error.errors)
            return of(
              loginFailureAction({ errors: errorResponse.error.errors }),
            )
          }),
        )
      }),
    ),
  )
  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/')
        }),
      ),
    { dispatch: false },
  )
  redirectEmailFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(emailValFailureAction),
        tap(() => {
          this.router.navigateByUrl('/emailvalidation')
        }),
      ),
    { dispatch: false },
  )
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router,
  ) {}
}
