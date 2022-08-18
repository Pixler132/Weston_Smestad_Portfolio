import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { CreateArticleComponent } from './components/createArticle/createArticle.component'
import { ArticleFormsModule } from 'src/app/shared/modules/articleForms/articleForms.module'
import { createArticleReducers } from './store/reducer/createArticle.reducer'
import { StoreModule } from '@ngrx/store'
import { CreateArticleService } from './services/createArticle.service'
import { EffectsModule } from '@ngrx/effects'
import { CreateArticleEffect } from './store/effects/createArticle.effects'
const routes = [
  {
    path: 'article/new',
    component: CreateArticleComponent,
  },
]
@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('createActicle', createArticleReducers),
    EffectsModule.forFeature([CreateArticleEffect]),
    ArticleFormsModule,
  ],
  exports: [],
  providers: [CreateArticleService],
})
export class CreateArticlesModule {}
