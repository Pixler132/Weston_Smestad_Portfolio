import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import {
  emailValidationAction,
  emailValidationSuccessAction,
  emailValidationFailureAction,
} from '../actions/auth.validation.actions'
/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class ValidationEffect {
  validateEmailUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(emailValidationAction),
      switchMap(({ url }) => {
        console.log('i repeat?')
        return this.authService.validateEmail(url).pipe(
          map(() => {
            return emailValidationSuccessAction()
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(emailValidationFailureAction())
          }),
        )
      }),
    ),
  )
  // redirectAfterSubmit$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(emailValidationFailureAction),
  //       tap(() => {
  //         //this.router.navigateByUrl('/')
  //       }),
  //     ),
  //   { dispatch: false },
  // )
  constructor(
    private actions$: Actions,
    private authService: AuthService,

    private router: Router,
  ) {}
}
