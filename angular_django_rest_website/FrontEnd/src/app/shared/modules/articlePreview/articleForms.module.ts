import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ArticleContentBlockModule } from 'src/app/shared/modules/articleContentBlock/articleContentBlock.module'

import { ArticlePreviewComponent } from './components/articlePreview/article.component'

const routes = [{ path: 'test', component: ArticlePreviewComponent }]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    //
    //   TagListModule,
    //   LoadingModule,
    //   ErrorMessageModule,
    //   TagListModule,
    ArticleContentBlockModule,
  ],
  declarations: [ArticlePreviewComponent],
  exports: [ArticlePreviewComponent],
  providers: [],
})
export class ArticlePreviewModule {}
