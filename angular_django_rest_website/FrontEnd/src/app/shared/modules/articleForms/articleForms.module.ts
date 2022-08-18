import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ReactiveFormsModule } from '@angular/forms'
import { ArticleFormComponent } from './components/articleForms/article-form.component'

import { NgxImageCompressService } from 'ngx-image-compress'
import { ArticleContentBlockModule } from '../articleContentBlock/articleContentBlock.module'
import { MaterialModule } from '../material/material.module'
import { ArticlePreviewModule } from '../articlePreview/articleForms.module'
import { ArticleFormInfoComponent } from './components/articleFormInfo/articleFormInfo.component'
import { ArticleContentComponent } from './components/articleContent/articleContent.component'
import { ImageUploaderModule } from '../imageUploader/imageUploader.module'
import { TagSelectorComponent } from './components/tagSelector/tagSelector.component'
import { GetAvailableTagsService } from './services/tagSelector.service'
import { EffectsModule } from '@ngrx/effects'
import { GetTagEffect } from './components/store/effects/getTag.effects'

@NgModule({
  declarations: [
    ArticleFormComponent,
    ArticleFormInfoComponent,
    ArticleContentComponent,
    TagSelectorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImageUploaderModule,
    ArticleContentBlockModule,
    MaterialModule,
    ArticlePreviewModule,
    EffectsModule.forFeature([GetTagEffect]),
  ],
  exports: [ArticleFormComponent],
  providers: [NgxImageCompressService, GetAvailableTagsService],
})
export class ArticleFormsModule {}
