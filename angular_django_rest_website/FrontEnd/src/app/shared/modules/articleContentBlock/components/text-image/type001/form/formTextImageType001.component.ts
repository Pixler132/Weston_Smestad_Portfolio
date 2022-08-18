import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'dz-form-text-image-type-001',
  templateUrl: './formTextImageType001.component.html',
  styleUrls: ['./formTextImageType001.component.sass'],
})
export class FormTextImageType001Component implements OnInit {
  @Input() parentFormGroup!: FormGroup

  constructor() {}

  ngOnInit() {}
}
