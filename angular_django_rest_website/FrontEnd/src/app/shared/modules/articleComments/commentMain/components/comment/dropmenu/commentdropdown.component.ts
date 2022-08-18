import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

@Component({
  selector: 'dz-commentmenu',
  templateUrl: './commentdropdown.component.html',
  styleUrls: ['./commentdropdown.component.sass'],
})
export class CommentDropDownComponent implements OnInit, OnDestroy {
  @Output() dropDownEvent = new EventEmitter<string>()
  @Input() isAuthor!: Observable<boolean>
  @Input() isReply: boolean = false
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}
  initializeForm(): void {}
  initializeListeners(): void {}
  onEdit(): void {}
  onDelete(): void {}
  onClick(s: string) {
    this.dropDownEvent.emit(s)
  }
  fetchComments(): void {}
}
