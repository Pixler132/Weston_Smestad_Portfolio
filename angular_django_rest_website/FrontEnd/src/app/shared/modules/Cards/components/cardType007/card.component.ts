import { Component, OnInit, OnDestroy, Input } from '@angular/core'

import { ArticleBlockInterface } from 'src/app/shared/interfaces/articleBlock.interface'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'dz-card-type-007',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardType007Component implements OnInit, OnDestroy {
  @Input('article') article!: ArticlesInterface
  @Input('index') indexProps!: number
  baseMedia: string
  constructor() {
    this.baseMedia = environment.baseMedia
  }
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
