import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { Observable, filter, tap, Subject, takeUntil } from 'rxjs'
import { AuthUpdateInterface } from 'src/app/pages/auth/interfaces/authUpdate.interface'
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
} from 'src/app/pages/auth/store/actions/auth.updateCurrentUserData.actions'
import {
  currentUserSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/pages/auth/store/selectors/auth.selectors'

import { ArticleBlockInterface } from 'src/app/shared/interfaces/articleBlock.interface'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'

@Component({
  selector: 'dz-username-form',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.sass'],
})
export class UsernameComponent implements OnInit, OnDestroy {
  form!: FormGroup
  @Input() currentUser!: CurrentUserInterface
  @Output() cancelEdit = new EventEmitter()
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>
  error: string | undefined
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
  ) {
    this.error = undefined
  }
  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  initializeValues(): void {
    this.form = this.fb.group({
      newUserName: [null, Validators.required],
    })
    this.store
      .select(currentUserSelector)
      .pipe(filter((x) => x != null))
      .subscribe((data) => {
        if (data) {
          this.currentUser = data
          this.fetchData()
        }
      })

    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }
  initializeListeners(): void {}

  fetchData(): void {
    if (this.currentUser)
      this.form = this.fb.group({
        newUserName: this.currentUser.currentUser.userName,
      })
  }
  onCancel() {
    this.cancelEdit.emit()
  }
  onSubmit(): void {
    console.log(this.form)
    const currentUserInput: AuthUpdateInterface = {
      user: {
        password: undefined,
        email: undefined,
        bio: undefined,
        image: undefined,
        userName: { newUserName: this.form.value.newUserName },
        firstName: undefined,
        lastName: undefined,
      },
    }
    this.store.dispatch(updateCurrentUserAction({ currentUserInput }))
  }

  ngOnDestroy(): void {}
}
