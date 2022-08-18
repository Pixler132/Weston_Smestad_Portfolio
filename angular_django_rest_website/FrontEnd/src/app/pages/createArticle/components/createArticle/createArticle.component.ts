import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'

import { Observable } from 'rxjs'

import {
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/pages/auth/store/selectors/auth.selectors'
import { ArticleInputInterface } from 'src/app/shared/interfaces/articleInput.interface'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'

import { createArticleAction } from '../../store/actions/createArticle.actions'

@Component({
  selector: 'dz-create-article',
  templateUrl: './createArticle.component.html',
  styleUrls: ['./createArticle.component.sass'],
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    tags: [''],
    articleTitle: '',
    articleDescription: '',
    articleImage: '',
    content: [
      // { title: 'sadf', type: 1, body: '', image: 'asdf', position: 0 },
      // { title: 'sadf', type: 2, body: '', image: 'asdf', position: 0 },
    ],
  }

  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    console.log(articleInput)
    this.store.dispatch(createArticleAction({ articleInput }))
  }
}
