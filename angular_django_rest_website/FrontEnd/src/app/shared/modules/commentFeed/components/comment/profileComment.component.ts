import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { Actions } from '@ngrx/effects'
import { ProfileComment } from '../../interfaces/getCommentFeedResponce.interface'

@Component({
  selector: 'dz-pro-Comment',
  templateUrl: './profileComment.component.html',
  styleUrls: ['./profileComment.component.sass'],
})
export class ProfileCommentComponent implements OnInit, OnDestroy, OnChanges {
  @Input('comment') comment!: ProfileComment
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private actions$: Actions,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.initValues()

    this.initListners()
  }
  ngOnDestroy(): void {}
  initListners() {
    this.fetchFeed()
  }
  initValues(): void {}
  fetchFeed(): void {}
  onpageUp(page: string): void {}
  onPageNavigated(page: number): void {}
  onNav(id: number): void {}
  onRemove(id: number): void {}
}
