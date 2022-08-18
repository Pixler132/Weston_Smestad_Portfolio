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
  selector: 'dz-profile-image-form',
  templateUrl: './updateImage.component.html',
  styleUrls: ['./updateImage.component.sass'],
})
export class UpdateImageComponent implements OnInit, OnDestroy {
  form!: FormGroup
  currentUser$!: Observable<CurrentUserInterface | null>
  currentUser: CurrentUserInterface | null
  constructor(private store: Store, private fb: FormBuilder) {
    this.currentUser = null
  }
  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnDestroy(): void {}

  initializeValues(): void {
    this.form = this.fb.group({
      newImage: '',
    })
    this.store
      .select(currentUserSelector)
      .pipe(filter((x) => x != null))
      .subscribe((data) => {
        console.log('here', data)
        this.currentUser = data
        this.fetchData()
      })
  }

  initializeListeners(): void {}

  fetchData(): void {
    if (this.currentUser)
      this.form = this.fb.group({
        newImage: this.currentUser.currentUser.image,
      })
    console.log(this.form)
  }

  onSubmit(): void {
    this.form
    const currentUserInput: AuthUpdateInterface = {
      user: {
        password: undefined,
        email: undefined,
        bio: undefined,
        image: this.form.value,
        userName: undefined,
        firstName: undefined,
        lastName: undefined,
      },
    }
    this.store.dispatch(updateCurrentUserAction({ currentUserInput }))
    console.log(currentUserInput)
  }
}
