import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { PersistanceService } from 'src/app/shared/services/persistance.service'
import { AuthService } from '../../services/auth.service'

import {
  logoutAction,
  logoutFailureAction,
  logoutSuccessAction,
} from '../actions/auth.sync.actions'

@Injectable()
export class LogoutEffect {
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction),
      switchMap(() => {
        return this.authService.logout().pipe(
          map(() => {
            this.persistanceService.set('accessToken', '')
            this.router.navigateByUrl('/')
            return logoutSuccessAction()
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log(errorResponse.error.detail)
            if (errorResponse.error.detail === 'Invalid token.') {
              this.persistanceService.set('accessToken', '')
              this.router.navigateByUrl('/')
            }
            return of(logoutFailureAction())
          }),
        )
      }),
    ),
  )
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private persistanceService: PersistanceService,
  ) {}
}
/*
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction),
      switchMap(() => {
        return this.authService.logout().pipe(
          map(() => {
          this.persistanceService.set('accessToken', '')
          this.router.navigateByUrl('/')
            return loginSuccessAction()
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log(errorResponse)
            return of(loginFailureAction())
          }),
        )
      }),
    ),
  )


*/
