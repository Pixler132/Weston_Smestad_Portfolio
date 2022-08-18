import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  NgZone,
  ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { Observable, filter, tap, take } from 'rxjs'
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
  selector: 'dz-bio-form',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.sass'],
})
export class BioComponent implements OnInit, OnDestroy {
  form!: FormGroup
  currentUser$!: Observable<CurrentUserInterface | null>
  @Input() currentUser!: CurrentUserInterface
  @Output() cancelEdit = new EventEmitter()
  @Input() edit: boolean = false
  @ViewChild('autosize') autosize!: CdkTextareaAutosize
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true))
  }
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
    private _ngZone: NgZone,
  ) {}
  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnDestroy(): void {}

  initializeValues(): void {
    this.form = this.fb.group({
      newBio: '',
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
        newBio: this.currentUser.currentUser.bio,
      })
    console.log(this.form)
  }

  onSubmit(): void {
    const currentUserInput: AuthUpdateInterface = {
      user: {
        password: undefined,
        email: undefined,
        bio: { newBio: this.form.value.newBio },
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
    this.form.value.newBio = this.currentUser.currentUser.bio
  }
}
