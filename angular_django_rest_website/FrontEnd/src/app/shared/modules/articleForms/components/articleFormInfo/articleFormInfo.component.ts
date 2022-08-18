import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'dz-article-form-info',
  templateUrl: './articleFormInfo.component.html',
  styleUrls: ['./articleFormInfo.component.sass'],
})
export class ArticleFormInfoComponent implements OnInit {
  @Input() parentFormGroup!: FormGroup
  @Output() selected_tag_output = new EventEmitter<string[]>()
  @Input() old_tag_list_props: string[]
  selected_tag_list: string[] = []
  available_tag_list: string[]
  constructor() {
    this.available_tag_list = [
      'hello',
      'world0',
      'world1',
      'world2',
      'world3',
      'world4',
      'world5',
      'world6',
    ]
    this.old_tag_list_props = []
  }
  addTag(value: string, index: number) {
    this.selected_tag_list.push(value)

    this.available_tag_list.splice(index, 1)
    this.selected_tag_output.emit(this.selected_tag_list)
  }
  removeTag(value: any) {
    this.selected_tag_output.emit(value)
  }
  ngOnInit() {
    this.initValues()
  }
  initValues() {
    if (this.old_tag_list_props[0] !== '') {
      this.available_tag_list = this.available_tag_list.filter((val) => {
        return !this.old_tag_list_props.includes(val)
      })
      //this.selected_tag_list = this.old_tag_list_props
      console.log(this.selected_tag_list)
      for (let i = 0; i < this.old_tag_list_props.length; i++)
        this.selected_tag_list.push(this.old_tag_list_props[i])
    }
  }
}
