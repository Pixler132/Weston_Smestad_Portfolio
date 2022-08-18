import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'

@Component({
  selector: 'dz-backendErrors',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.sass'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps!: BackendErrorsInterface | null

  errorMessages: string[]
  constructor() {
    this.errorMessages = []
    console.log(this.backendErrorsProps)
  }

  ngOnInit(): void {}
}
/*
    object.key(obj)
        method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
    (obj)
        The object of which the enumerable's own properties are to be returned.
    .join(' ')
        joins all array elements with (' ')
*/
