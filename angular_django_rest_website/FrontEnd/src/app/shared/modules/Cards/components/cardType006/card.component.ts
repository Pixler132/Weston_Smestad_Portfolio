import { DatePipe } from '@angular/common'
import { Component, OnInit, OnDestroy, Input } from '@angular/core'

import { ArticleBlockInterface } from 'src/app/shared/interfaces/articleBlock.interface'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'dz-card-type-006',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardType006Component implements OnInit, OnDestroy {
  @Input('article') article!: ArticlesInterface
  @Input('index') indexProps!: number
  baseMedia: string
  date: string | null
  pipe = new DatePipe('en-US')
  imageUrl!: string
  authorImageUrl!: string
  storyBookTest!: boolean
  storyBookTestImageUrl: string =
    'https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg'
  constructor() {
    this.baseMedia = environment.baseMedia
    this.date = this.pipe.transform(Date.now(), 'EEEE, MMMM d, y')
  }
  ngOnInit(): void {
    if (this.article.articleImage !== undefined)
      this.imageUrl = this.baseMedia + this.article.articleImage
    if (this.article.articleImage !== undefined)
      this.authorImageUrl = this.baseMedia + this.article.author.profileImg
    this.initializeValues()
    this.initializeListeners()
    this.fetchData()
    console.log(this.article)
  }

  ngOnDestroy(): void {}

  initializeValues(): void {}

  initializeListeners(): void {}

  fetchData(): void {}

  deleteArticle(): void {}
}
