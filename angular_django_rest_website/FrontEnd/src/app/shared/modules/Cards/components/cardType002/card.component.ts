import { DatePipe } from '@angular/common'
import { Component, OnInit, OnDestroy, Input } from '@angular/core'

import { ArticleBlockInterface } from 'src/app/shared/interfaces/articleBlock.interface'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'dz-card-type-002',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardType002Component implements OnInit, OnDestroy {
  @Input('article') article!: ArticlesInterface
  @Input('index') indexProps!: number
  baseMedia: string
  date: string | null
  pipe = new DatePipe('en-US')
  imageUrl!: string
  storyBookTest!: boolean
  fav!: boolean
  constructor() {
    this.baseMedia = environment.baseMedia
    this.date = this.pipe.transform(Date.now(), 'MMM, d')
  }
  ngOnInit(): void {
    console.log(this.article)
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
