import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'dz-form-image-image-type-001',
  templateUrl: './formImageImageType001.component.html',
  styleUrls: ['./formImageImageType001.component.sass'],
})
export class FormImageImageType001Component implements OnInit {
  @Input() parentFormGroup!: FormGroup

  constructor() {}

  ngOnInit() {
    console.log(this.parentFormGroup)
  }
}
