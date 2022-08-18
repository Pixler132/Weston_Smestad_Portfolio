import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import {
  getTagAction,
  getTagSuccessAction,
} from '../store/actions/getTags.actions'

@Component({
  selector: 'dz-tag-selector',
  templateUrl: './tagSelector.component.html',
  styleUrls: ['./tagSelector.component.sass'],
})
export class TagSelectorComponent implements OnInit {
  @Output() selected_tag_output = new EventEmitter<string[]>()
  @Input() old_tag_list_props: string[]
  selected_tag_list: string[] = []
  available_tag_list: string[]
  constructor(private store: Store, private _actions$: Actions) {
    this.available_tag_list = []
    this.old_tag_list_props = []
  }
  ngOnInit() {
    this.initValues()
  }
  initValues() {
    this.store.dispatch(getTagAction())
    this._actions$.pipe(ofType(getTagSuccessAction)).subscribe((data: any) => {
      for (let i = 0; i < data.tags.length; i++)
        this.available_tag_list.push(data.tags[i])
      this.available_tag_list.sort()
    })

    if (this.old_tag_list_props[0] !== '') {
      this.available_tag_list = this.available_tag_list.filter((val) => {
        return !this.old_tag_list_props.includes(val)
      })

      console.log(this.selected_tag_list)
      for (let i = 0; i < this.old_tag_list_props.length; i++)
        this.selected_tag_list.push(this.old_tag_list_props[i])
    }
  }
  addTag(value: string, index: number) {
    this.selected_tag_list.push(value)
    this.selected_tag_list.sort()
    this.available_tag_list.splice(index, 1).sort()
    this.selected_tag_output.emit(this.selected_tag_list)
  }
  removeTag(index: number, value: string) {
    this.selected_tag_list.splice(index, 1).sort()
    this.available_tag_list.push(value)
    this.available_tag_list.sort()
    this.selected_tag_output.emit(this.selected_tag_list)
  }
}
/*
      <dz-tag-selector
        [old_tag_list_props]="old_tag_list_props"
        (selected_tag_output)="removeTag($event)"
      ></dz-tag-selector>
*/
