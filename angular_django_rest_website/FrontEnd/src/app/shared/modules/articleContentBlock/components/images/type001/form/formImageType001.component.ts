import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'dz-image-form-type-001',
  templateUrl: './formImageType001.component.html',
  styleUrls: ['./formImageType001.component.sass'],
})
export class FormImageType001Component implements OnInit {
  @Input() parentFormGroup!: FormGroup

  constructor() {}

  ngOnInit() {}
}
