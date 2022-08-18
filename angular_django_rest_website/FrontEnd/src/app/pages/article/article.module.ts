import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { CommentModule } from 'src/app/shared/modules/articleComments/articleComment.module'
import { ArticleContentBlockModule } from 'src/app/shared/modules/articleContentBlock/articleContentBlock.module'

import { ArticleService } from 'src/app/shared/services/article.service'
import { ArticleComponent } from './components/article/article.component'

import { DeleteArticleService } from './services/article.service'
import { DeleteArticleEffect } from './store/effects/deleteArticle.effects'
import { FavoriteArticleEffect } from './store/effects/favorite.Article.effects'
import { GetArticleEffect } from './store/effects/getArticle.effects'
import { ArticleReducers } from './store/reducer/article.reducer'

const routes = [
  {
    path: 'article/:title',
    component: ArticleComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('article', ArticleReducers),
    EffectsModule.forFeature([
      GetArticleEffect,
      DeleteArticleEffect,
      FavoriteArticleEffect,
    ]),
    //
    //   TagListModule,
    //   LoadingModule,
    //   ErrorMessageModule,
    //   TagListModule,
    ArticleContentBlockModule,
    CommentModule,
  ],
  declarations: [ArticleComponent],
  providers: [ArticleService, DeleteArticleService],
})
export class ArticleModule {}
