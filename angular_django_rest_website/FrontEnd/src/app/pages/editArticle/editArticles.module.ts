import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { ArticleFormsModule } from 'src/app/shared/modules/articleForms/articleForms.module'

import { StoreModule } from '@ngrx/store'

import { EffectsModule } from '@ngrx/effects'
import { EditArticleComponent } from './components/editArticle/editArticle.component'
import { EditArticleReducer } from './store/reducer/editArticle.reducer'
import { UpdateArticleEffect } from './store/effects/editArticle.effects'
import { EditArticleService } from './services/updateArticle.service'

import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service'

import { GetArticleEffect } from './store/effects/getArticle.effects'

const routes = [
  {
    path: 'article/:title/edit',
    component: EditArticleComponent,
  },
]
@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('editActicle', EditArticleReducer),
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    ArticleFormsModule,

    //LoadingModule,
  ],
  exports: [],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticlesModule {}
