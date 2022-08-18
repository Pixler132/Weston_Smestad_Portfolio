import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, tap, filter } from 'rxjs'
import { updateCurrentUserSuccessAction } from 'src/app/pages/auth/store/actions/auth.updateCurrentUserData.actions'
import { currentUserSelector } from 'src/app/pages/auth/store/selectors/auth.selectors'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'

@Component({
  selector: 'dz-loginDataPage',
  templateUrl: './loginDataPage.component.html',
  styleUrls: ['./loginDataPage.component.sass'],
})
export class LoginDataPageComponent implements OnInit {
  currentUser$!: Observable<CurrentUserInterface | null>
  form!: FormGroup
  currentUser!: CurrentUserInterface
  edit: Edit
  default: Edit
  Submit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCurrentUserSuccessAction),
        tap(() => {
          console.log('good')
          this.onReset()
        }),
      ),
    { dispatch: false },
  )
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private actions$: Actions,
  ) {
    this.edit = {
      username: false,
      email: false,
      password: false,
    }
    this.default = { ...this.edit }
    this.Submit$.subscribe()
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.initializeListeners()
    this.initializeValues()
  }
  initializeValues(): void {
    this.store
      .select(currentUserSelector)
      .pipe(filter((x) => x != null))
      .subscribe((data) => {
        if (data) {
          this.currentUser = data
        }
      })
  }
  onReset(): void {
    console.warn('reset')
    this.edit = { ...this.default }
    console.log(this.edit)
  }
  onEdit(type: string): void {
    switch (type) {
      case 'username':
        this.edit = { ...this.default }
        this.edit.username = true
        break
      case 'email':
        this.edit = { ...this.default }
        this.edit.email = true
        console.log('bark')
        break
      case 'password':
        this.edit = { ...this.default }
        this.edit.password = true
        console.log('bark')
        break
    }
  }
  initializeForm(): void {}
  initializeListeners(): void {}
  onSubmit(): void {}
}
interface Edit {
  username: boolean
  email: boolean
  password: boolean
}
