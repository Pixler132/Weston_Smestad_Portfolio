import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { Observable, tap } from 'rxjs'
import { AuthUpdateInterface } from 'src/app/pages/auth/interfaces/authUpdate.interface'
import Validation from 'src/app/pages/auth/services/auth.confirm-password.validator.service'

import {
  updateCurrentUserAction,
  updateCurrentUserSuccessAction,
  //updatePasswordAction,
} from 'src/app/pages/auth/store/actions/auth.updateCurrentUserData.actions'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/pages/auth/store/selectors/auth.selectors'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'

import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'

@Component({
  selector: 'dz-password-form',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.sass'],
})
export class PasswordComponent implements OnInit, OnDestroy {
  form!: FormGroup
  @Output() cancelEdit = new EventEmitter()
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>
  error: string | undefined
  @Input() edit: boolean = false
  @Input() currentUser!: CurrentUserInterface
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
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnDestroy(): void {}

  initializeValues(): void {
    this.form = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(128),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(128),
          ],
        ],
        oldPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(128),
          ],
        ],
      },
      {
        validators: [Validation.match('newPassword', 'confirmPassword')],
      },
    )
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    console.log(this.form)
  }

  initializeListeners(): void {}

  fetchData(): void {}

  onSubmit(): void {
    const currentUserInput: AuthUpdateInterface = {
      user: {
        password: this.form.value,
        email: undefined,
        bio: undefined,
        image: undefined,
        userName: undefined,
        firstName: undefined,
        lastName: undefined,
      },
    }
    this.store.dispatch(updateCurrentUserAction({ currentUserInput }))
    console.log(currentUserInput)
  }
  onCancel() {
    this.cancelEdit.emit()
  }
}
