import { Component, OnInit, OnDestroy, Input } from '@angular/core'

import { ArticleBlockInterface } from 'src/app/shared/interfaces/articleBlock.interface'

@Component({
  selector: 'dz-body-type-001',
  templateUrl: './articleDisplayType005.component.html',
  styleUrls: ['./articleDisplayType005.component.sass'],
})
export class BodyType001Component implements OnInit, OnDestroy {
  @Input('content') content!: ArticleBlockInterface

  constructor() {}
  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    this.fetchData()
  }

  ngOnDestroy(): void {}

  initializeValues(): void {}

  initializeListeners(): void {}

  fetchData(): void {}

  deleteArticle(): void {}
}
