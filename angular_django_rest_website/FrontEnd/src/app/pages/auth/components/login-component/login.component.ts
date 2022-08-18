import { trigger, state, style, transition, animate } from '@angular/animations'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'
import { LoginRequestInterface } from '../../interfaces/auth.login.request.interface'
import { loginAction } from '../../store/actions/auth.login.actions'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors/auth.selectors'

// import { loginAction } from 'src/app/pages/auth/store/actions/auth.login.actions'
// import {
//   isSubmittingSelector,
//   validationErrorsSelector,
// } from '../../store/selectors/auth.selectors'
// import { LoginRequestInterface } from '../../interface/loginRequest.interface'

@Component({
  selector: 'dz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>
  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      userObject: ['', Validators.required],
      password: ['', Validators.required],
    })
    //this.isSubmitting$ = false
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {
    console.log(this.form)
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(
      select<any, boolean>(isSubmittingSelector),
    )
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
    this.form = this.fb.group({
      userObject: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  hi(): void {
    console.log('h')
  }
  onSubmit(): void {
    console.log('h')
    const payload: LoginRequestInterface = {
      user: this.form.value,
    }

    this.store.dispatch(loginAction({ payload }))
  }
}
