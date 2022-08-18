import { Component, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable, tap } from 'rxjs'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'
import { AuthRegistrationRequestInterface } from '../../interfaces/auth.registration.request.interface'
import Validation from '../../services/auth.confirm-password.validator.service'
import { registerAction } from '../../store/actions/auth.register.actions'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors/auth.selectors'

@Component({
  selector: 'dz-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>
  constructor(private fb: FormBuilder, private store: Store) {
    // this.form = this.fb.group(
    //   {
    //     userObject: [''],
    //     password: ['', Validators.required],
    //   },
    //   {},
    // )
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls
  }
  ngOnInit(): void {
    this.initForm()
    this.initValues()
  }
  initValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(
      select(validationErrorsSelector),
      tap((error) => console.log(error)),
    )
  }
  initForm(): void {
    this.form = this.fb.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(128),
          ],
        ],
        confirmPassword: ['', Validators.required],
        firstName: [''],
        lastName: [''],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      },
    )
  }
  onSubmit(): void {
    const payload: AuthRegistrationRequestInterface = {
      user: this.form.value,
    }
    console.log(this.form)
    this.store.dispatch(registerAction({ payload })) // request <-auth.types.actions; -> auth.register.actions;
  }
}
