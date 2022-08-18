import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, filter, tap } from 'rxjs'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'

import { AuthUpdateInterface } from '../../interfaces/authUpdate.interface'
import {
  updateCurrentUserAction,
  updateCurrentUserSuccessAction,
} from '../../store/actions/auth.updateCurrentUserData.actions'
import { currentUserSelector } from '../../store/selectors/auth.selectors'

@Component({
  selector: 'dz-updateProfile',
  templateUrl: './updateProfile.component.html',
  styleUrls: ['./updateProfile.component.sass'],
})
export class UpdateProfileComponent implements OnInit {
  currentUser$!: Observable<CurrentUserInterface | null>
  currentUser!: CurrentUserInterface
  form!: FormGroup

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
      name: false,
      bio: false,
      email: false,
      notifications: false,
      image: false,
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
      case 'name':
        this.edit = { ...this.default }
        this.edit.name = true

        break
      case 'username':
        this.edit = { ...this.default }
        this.edit.username = true
        break

      case 'bio':
        this.edit = { ...this.default }
        this.edit.bio = true

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
  name: boolean
  bio: boolean
  email: boolean
  notifications: boolean
  image: boolean
  password: boolean
}
