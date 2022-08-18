import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'dz-form-image-text-type-001',
  templateUrl: './formImageTextType001.component.html',
  styleUrls: ['./formImageTextType001.component.sass'],
})
export class FormImageTextType001Component implements OnInit {
  @Input() parentFormGroup!: FormGroup

  constructor() {}

  ngOnInit() {}
}
