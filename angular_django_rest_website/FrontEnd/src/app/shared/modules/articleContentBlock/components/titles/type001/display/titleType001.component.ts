import { Component, OnInit, OnDestroy, Input } from '@angular/core'

import { ArticleBlockInterface } from 'src/app/shared/interfaces/articleBlock.interface'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'dz-title-type-001',
  templateUrl: './titleType001.component.html',
  styleUrls: ['./titleType001.component.sass'],
})
export class TitleType001Component implements OnInit, OnDestroy {
  @Input('content') content!: ArticleBlockInterface
  baseMedia = environment.baseMedia
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
