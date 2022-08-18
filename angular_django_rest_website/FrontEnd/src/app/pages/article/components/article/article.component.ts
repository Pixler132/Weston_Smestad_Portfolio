import { DatePipe } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Subscription, Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

import { currentUserSelector } from 'src/app/pages/auth/store/selectors/auth.selectors'
import { saveArticleAction } from 'src/app/pages/editArticle/store/actions/updateArticle.actions'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'
import { ArticleService } from 'src/app/shared/services/article.service'
import { ContentTypes, environment } from 'src/environments/environment'

import { deleteArticleAction } from '../../store/actions/deleteArticle.actions'
import { favoriteArticleAction } from '../../store/actions/favoriteArticle.actions'
import { getArticleAction } from '../../store/actions/getArticle.actions'
import {
  isLoadingSelector,
  errorSelector,
  articleSelector,
  isFavoritingSelector,
} from '../../store/selectors/articles.selectors'

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  title: string
  article!: ArticlesInterface
  articleSubscription!: Subscription
  isLoading$!: Observable<boolean>
  isFavoriting$!: Observable<boolean>
  error$!: Observable<string | null>
  isAuthor$!: Observable<boolean>
  commentUrl: string
  favorited: boolean
  date: string | null
  pipe = new DatePipe('en-US')
  todayWithPipe = null
  contentType: ContentTypes
  baseMedia = environment.baseMedia
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private articleService: ArticleService,
    private titleService: Title,
    private meta: Meta,
  ) {
    this.title = ''
    this.commentUrl = ''
    this.date = ''
    this.favorited = false
    this.contentType = environment.contentTypes
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    this.fetchData()
  }

  ngOnDestroy(): void {
    //this.articleSubscription.unsubscribe()
  }

  initializeValues(): void {
    this.title = this.route.snapshot.paramMap.get('title') || ''
    //this.title = this.article.articleTitle
    // this.meta.addTag({
    //   name: 'description',
    //   content: this.article.articleDescription,
    // })
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.isFavoriting$ = this.store.pipe(select(isFavoritingSelector))
    this.error$ = this.store.pipe(select(errorSelector))

    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector)),
    ]).pipe(
      map(
        ([article, currentUser]: [
          ArticlesInterface | null,
          CurrentUserInterface | null,
        ]) => {
          if (!article || !currentUser) {
            return false
          }

          return currentUser.currentUser.userName === article.author.username
        },
      ),
    )
  }

  initializeListeners(): void {
    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe((article) => {
        if (article !== null) {
          this.article = article

          if (article) {
            this.titleService.setTitle(this.article.articleTitle)
            this.meta.addTags([
              {
                name: 'description',
                content: this.article.articleDescription,
              },
              { keywords: this.article.tags.toString() },
            ])

            this.commentUrl =
              environment.getCommentsApiUrl + `${this.article.id}/`
          }
          this.date = this.pipe.transform(Date.now(), 'EEEE, MMMM d, y')
        }
      })
  }

  fetchData(): void {
    console.log('asdf')
    this.store.dispatch(getArticleAction({ title: this.title }))
  }

  onEdit(): void {
    this.store.dispatch(saveArticleAction({ article: this.article }))
  }
  deleteArticle(): void {
    this.router.navigate(['/'])
    this.store.dispatch(deleteArticleAction({ title: this.title }))
  }
  onAuthorClick(): void {
    console.log('dispatch action to get author page')
  }
  onFav() {
    this.store.dispatch(favoriteArticleAction({ myArticle: this.article }))
  }
}
