import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'dz-block-type-menu',
  templateUrl: './blockTypeMenu.component.html',
  styleUrls: ['./blockTypeMenu.component.sass'],
})
export class BlockTypeMenuComponent implements OnInit, OnDestroy {
  constructor() {}
  contentTypes = environment.contentTypes

  @Output() newItemEvent = new EventEmitter<string>()
  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnDestroy(): void {}

  initializeValues(): void {}

  initializeListeners(): void {}

  onAddType(type: string, customObject: boolean): void {
    this.newItemEvent.emit(type)
  }
}
