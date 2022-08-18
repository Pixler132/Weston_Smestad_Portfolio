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
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
} from '../actions/auth.updateCurrentUserData.actions'
/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class UpdateCurrentUserEffect {
  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCurrentUserAction),
      switchMap(({ currentUserInput }) => {
        return this.authService.updateCurrentUser(currentUserInput).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set(
              'accessToken',
              currentUser.currentUser.token,
            )
            return updateCurrentUserSuccessAction({ currentUser })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateCurrentUserFailureAction({
                errors: errorResponse.error.errors,
              }),
            )
          }),
        )
      }),
    ),
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router,
  ) {}
}
