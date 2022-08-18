import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'dz-title-form-type-001',
  templateUrl: './TitleFormType001.component.html',
  styleUrls: ['./TitleFormType001.component.sass'],
})
export class TitleFormType001Component implements OnInit {
  @Input() parentFormGroup!: FormGroup
  edit: boolean = true
  constructor() {}

  ngOnInit() {}
  onEdit() {
    this.edit = !this.edit
  }
}
