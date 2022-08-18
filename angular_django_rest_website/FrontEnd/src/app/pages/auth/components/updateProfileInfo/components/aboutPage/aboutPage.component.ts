import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, tap, filter } from 'rxjs'
import { updateCurrentUserSuccessAction } from 'src/app/pages/auth/store/actions/auth.updateCurrentUserData.actions'
import { currentUserSelector } from 'src/app/pages/auth/store/selectors/auth.selectors'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'

@Component({
  selector: 'dz-AboutPage',
  templateUrl: './aboutPage.component.html',
  styleUrls: ['./aboutPage.component.sass'],
})
export class AboutPageComponent implements OnInit {
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
      name: false,
      bio: false,

      image: false,
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
      case 'bio':
        this.edit = { ...this.default }
        this.edit.bio = true
        break
    }
  }
  initializeForm(): void {}
  initializeListeners(): void {}
  onSubmit(): void {}
}
interface Edit {
  name: boolean
  bio: boolean

  image: boolean
}
