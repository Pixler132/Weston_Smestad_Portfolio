import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'dz-article-content',
  templateUrl: './articleContent.component.html',
  styleUrls: ['./articleContent.component.sass'],
})
export class ArticleContentComponent implements OnInit {
  @Input() block!: FormGroup
  @Output() onDeleteEvent = new EventEmitter<number>()
  contentTypes = environment.contentTypes
  constructor() {}

  ngOnInit() {}
  onDelete(): void {
    this.onDeleteEvent.emit()
  }
}
