import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'

import { Subscription, Observable } from 'rxjs'
import { ArticleInputInterface } from 'src/app/shared/interfaces/articleInput.interface'

@Component({
  selector: 'dz-article-preview',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticlePreviewComponent implements OnInit, OnDestroy {
  @Input('parentFormGroup') article!: ArticleInputInterface
  constructor() {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    this.fetchData()
  }

  ngOnDestroy(): void {}

  initializeValues(): void {
    // console.log(this.article)
  }

  initializeListeners(): void {}

  fetchData(): void {}

  deleteArticle(): void {}
  onAuthorClick(): void {}
}
