import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { Observable, tap } from 'rxjs'
import { AuthUpdateInterface } from 'src/app/pages/auth/interfaces/authUpdate.interface'
import {
  updateCurrentUserAction,
  updateCurrentUserSuccessAction,
} from 'src/app/pages/auth/store/actions/auth.updateCurrentUserData.actions'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/pages/auth/store/selectors/auth.selectors'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'

import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'

@Component({
  selector: 'dz-name-form',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.sass'],
})
export class NameComponent implements OnInit, OnDestroy {
  form!: FormGroup
  @Input() currentUser!: CurrentUserInterface
  @Output() cancelEdit = new EventEmitter()
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>
  currentUser$!: Observable<CurrentUserInterface | null>
  @Input() edit: boolean = false
  ErrorSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCurrentUserSuccessAction),
        tap(() => {
          this.onCancel()
        }),
      ),
    { dispatch: false },
  )

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private actions$: Actions,
  ) {}
  ngOnInit(): void {
    console.log(this.currentUser)
    this.initializeValues()
    this.initializeListeners()
  }

  initializeValues(): void {
    this.form = this.fb.group({
      newFirstName: '',
      newLastName: '',
    })
    this.fetchData()
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }
  initializeListeners(): void {
    this.ErrorSubmit$.subscribe()
  }

  fetchData(): void {
    if (this.currentUser)
      this.form = this.fb.group({
        newFirstName: this.currentUser.currentUser.firstName,
        newLastName: this.currentUser.currentUser.lastName,
      })
  }

  onSubmit(): void {
    const currentUserInput: AuthUpdateInterface = {
      user: {
        password: undefined,
        email: undefined,
        bio: undefined,
        image: undefined,
        userName: undefined,
        firstName: { newFirstName: this.form.value.newFirstName },
        lastName: { newLastName: this.form.value.newLastName },
      },
    }
    console.log(this.form.value)
    this.store.dispatch(updateCurrentUserAction({ currentUserInput }))
  }
  onCancel() {
    this.cancelEdit.emit()
  }

  ngOnDestroy(): void {
    // this.destroyed$.next(true)
    // this.destroyed$.complete()
  }
}
