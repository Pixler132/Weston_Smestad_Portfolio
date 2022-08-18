import { HttpParams } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'
import { LoginRequestInterface } from '../../interfaces/auth.login.request.interface'
import { logoutAction } from '../../store/actions/auth.sync.actions'
import { emailValidationAction } from '../../store/actions/auth.validation.actions'

@Component({
  selector: 'dz-emailvalidation',
  templateUrl: './emailValidation.component.html',
  styleUrls: ['./emailValidation.component.sass'],
})
export class EmailValidationComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.aipUrlProps = ''
  }
  data: boolean = true
  view: string = ''
  aipUrlProps: string

  ngOnInit(): void {
    console.log('dfghdfgh')
    this.route.queryParams.subscribe((params) => {
      console.log(params)
      this.data
      this.view = params['verification']
      if (params['verification'] === undefined) {
        this.data = false
      } else {
        this.data = true
      }
    })
    console.log(this.data)
    if (this.data) {
      this.validateEmail()
    }
  }
  ngOnDestroy(): void {}

  validateEmail(): void {
    const params = new HttpParams().append('verification', this.view)
    console.log('do i repeat')
    let fullUrl = `${this.aipUrlProps}?${params.toString()}`
    this.store.dispatch(emailValidationAction({ url: fullUrl }))
  }
  onLogout(): void {}
}
