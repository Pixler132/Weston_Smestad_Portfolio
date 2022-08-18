import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { favoriteArticleAction } from 'src/app/pages/article/store/actions/favoriteArticle.actions'
import { isFavoritingSelector } from 'src/app/pages/article/store/selectors/articles.selectors'

import { ArticleBlockInterface } from 'src/app/shared/interfaces/articleBlock.interface'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'dz-card-type-008',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardType008Component implements OnInit, OnDestroy {
  @Input('article') article!: ArticlesInterface
  @Input('index') indexProps!: number
  baseMedia: string
  isFavoriting$!: Observable<boolean>
  favorited: boolean = false
  constructor(private store: Store) {
    this.baseMedia = environment.baseMedia
  }
  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    this.fetchData()
  }

  ngOnDestroy(): void {}

  initializeValues(): void {
    if (this.article) this.favorited = this.article.favorited
    this.isFavoriting$ = this.store.pipe(select(isFavoritingSelector))
  }

  initializeListeners(): void {}

  fetchData(): void {}
  onFav(event: Event): void {
    event.stopPropagation()
    this.store.dispatch(favoriteArticleAction({ myArticle: this.article }))
    this.favorited = !this.favorited
  }
  deleteArticle(): void {}
}
