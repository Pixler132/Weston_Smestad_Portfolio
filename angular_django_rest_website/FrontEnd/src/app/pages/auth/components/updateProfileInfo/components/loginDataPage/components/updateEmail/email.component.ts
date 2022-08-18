import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { Observable, filter, tap } from 'rxjs'
import { AuthUpdateInterface } from 'src/app/pages/auth/interfaces/authUpdate.interface'
import {
  updateCurrentUserAction,
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
  selector: 'dz-email-form',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.sass'],
})
export class EmailComponent implements OnInit, OnDestroy {
  form!: FormGroup
  @Input() currentUser!: CurrentUserInterface
  @Output() cancelEdit = new EventEmitter()
  currentUser$!: Observable<CurrentUserInterface | null>
  @Input() edit: boolean = false
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>
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
    this.form = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]],
    })
    this.store
      .select(currentUserSelector)
      .pipe(filter((x) => x != null))
      .subscribe((data) => {
        console.log(data)
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
        newEmail: this.currentUser.currentUser.email,
      })
    console.log(this.form)
  }

  onSubmit(): void {
    let a = { user: { password: this.form.value } }
    console.log(a)
    const currentUserInput: AuthUpdateInterface = {
      user: {
        password: undefined,
        email: this.form.value,
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
