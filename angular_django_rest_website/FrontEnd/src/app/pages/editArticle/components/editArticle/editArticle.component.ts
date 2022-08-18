import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store'

import { combineLatest, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
//import { articleSelector } from 'src/app/pages/article/store/selectors/articles.selectors'
import { currentUserSelector } from 'src/app/pages/auth/store/selectors/auth.selectors'

import { ArticleInputInterface } from 'src/app/shared/interfaces/articleInput.interface'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'

import {
  saveArticleAction,
  updateArticleAction,
} from '../../store/actions/updateArticle.actions'
import {
  articleSelector,
  isLoadingSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors/editArticle.selectors'

@Component({
  selector: 'dz-edit-article',
  templateUrl: './editArticle.component.html',
  styleUrls: ['./editArticle.component.sass'],
})
export class EditArticleComponent implements OnInit {
  initialValues$!: Observable<ArticleInputInterface>
  isSubmitting$!: Observable<boolean>
  isLoading$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>
  title: string
  isAuthor$!: Observable<boolean>
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.title = ''
  }

  ngOnInit(): void {
    this.initialValues()
    this.fetchData()
    this.initializeListeners()
  }

  initialValues(): void {
    this.title = this.route.snapshot.paramMap.get('title') || ''
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticlesInterface) => {
        console.warn(article)

        return <ArticleInputInterface>{
          tags: article.tags,
          articleTitle: article.articleTitle,
          articleDescription: article.articleDescription,
          articleImage: article.articleImage,
          content: article.content,
        }
      }),
    )
  }

  fetchData(): void {
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
    this.isAuthor$.subscribe((h) => {
      if (!h) this.router.navigate(['/'])
    })
  }
  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(
      updateArticleAction({ title: this.title, articleInput }),
    )
  }
}
