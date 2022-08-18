import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable, filter, tap } from 'rxjs'
import { AuthUpdateInterface } from 'src/app/pages/auth/interfaces/authUpdate.interface'
import { updateCurrentUserAction } from 'src/app/pages/auth/store/actions/auth.updateCurrentUserData.actions'
import { currentUserSelector } from 'src/app/pages/auth/store/selectors/auth.selectors'

import { ArticleBlockInterface } from 'src/app/shared/interfaces/articleBlock.interface'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'

@Component({
  selector: 'dz-name-last-form',
  templateUrl: './updateLastName.component.html',
  styleUrls: ['./updateLastName.component.sass'],
})
export class UpdateLastNameComponent implements OnInit, OnDestroy {
  form!: FormGroup

  currentUser$!: Observable<CurrentUserInterface | null>
  currentUser!: CurrentUserInterface
  edit: boolean = false
  //destroyed$ = new Subject<boolean>()
  error: string | undefined
  constructor(
    private store: Store,
    private fb: FormBuilder, //updates$: Actions,
  ) {
    this.error = undefined
    // updates$
    //   .pipe(ofType(updateCurrentUserSuccessAction), takeUntil(this.destroyed$))
    //   .subscribe(() => {
    //     this.edit = !this.edit
    //   })
    // updates$
    //   .pipe(ofType(updateCurrentUserFailureAction), takeUntil(this.destroyed$))
    //   .subscribe((error) => {
    //     //this.error = error.errors.errors
    //   })
  }
  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  initializeValues(): void {
    this.form = this.fb.group({
      newLastName: '',
    })
    console.log('*******************************', this.form)
    this.store
      .select(currentUserSelector)
      .pipe(filter((x) => x != null))
      .subscribe((data) => {
        if (data) {
          this.currentUser = data
          this.fetchData()
        }
      })
  }
  initializeListeners(): void {}

  fetchData(): void {
    // if (this.currentUser)
    //   this.form = this.fb.group({
    //     newFirstName: this.currentUser.currentUser.userName,
    //     newLastName: this.currentUser.currentUser.userName,
    //   })
  }

  onSubmit(): void {
    const currentUserInput: AuthUpdateInterface = {
      user: {
        password: undefined,
        email: undefined,
        bio: undefined,
        image: undefined,
        userName: undefined,
        firstName: undefined,
        lastName: this.form.value,
      },
    }
    this.store.dispatch(updateCurrentUserAction({ currentUserInput }))
  }
  onEdit(): void {
    this.error = undefined
    if (this.currentUser)
      this.form = this.fb.group({
        newLastName: this.currentUser.currentUser.lastName,
      })
    this.edit = !this.edit
  }
  ngOnDestroy(): void {
    // this.destroyed$.next(true)
    // this.destroyed$.complete()
  }
}
