import { Component, OnInit, OnDestroy, Input } from '@angular/core'

import { ArticleBlockInterface } from 'src/app/shared/interfaces/articleBlock.interface'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'dz-image-image-type-001',
  templateUrl: './imageImageType001.component.html',
  styleUrls: ['./imageImageType001.component.sass'],
})
export class ImageImageType001Component implements OnInit, OnDestroy {
  @Input('content') content!: ArticleBlockInterface
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
