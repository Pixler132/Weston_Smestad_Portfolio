import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { AuthService } from '../../services/auth.service'
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/auth.register.actions'

@Injectable()
export class RegisterEffect {
  /*
    The actions$ effect is listening for all dispatched actions through the Actions stream, 
        but is only interested in the (registerAction) event using the ofType operator.
    
    request is the data being sent to http can comes from auth.register.actions.ts

    then maping what is returned from api 
    
    if Success will trigger registerSuccessAction and pass in (currentUser) the api response *Data from auth.service.ts

    if failure triggers registerFailureAction 

    effect most return Observable

    map returns an obserable but catchError dose not so the use of (of) turns it into one

    (errors) comes form auth.register.actions.ts

  EFFECTS must be declared in the module config


*/
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction), //<-auth.register.actions'
      switchMap(({ payload }) => {
        //<-auth.register.actions
        return this.authService.register(payload).pipe(
          map(() => {
            console.log('register')
            return registerSuccessAction() //<-auth.login.actions.ts @@ ->auth.reducer.ts ->redirectAfterSumit$
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({ errors: errorResponse.error.errors }), //<-auth.register.actions.ts @@ ->auth.reducer.ts
            )
          }),
        )
      }),
    ),
  )

  /*
      tap
        Used when you want to affect outside state with a notification without altering the notification
  */
  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/emailvalidation')
        }),
      ),
    { dispatch: false },
  )
  constructor(
    private actions$: Actions,
    private authService: AuthService,

    private router: Router,
  ) {}
}
