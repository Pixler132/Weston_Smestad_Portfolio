import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { NgxImageCompressService } from 'ngx-image-compress'
import { MaterialModule } from '../material/material.module'
import { ArticleImageFormComponent } from './components/articleImage/article-image-form.component'
import { ContentImageFormComponent } from './components/contentImage/content-image-form.component'
import { ProfileImageFormComponent } from './components/profileImage/profile-image-form.component'

@NgModule({
  declarations: [
    ArticleImageFormComponent,
    ProfileImageFormComponent,
    ContentImageFormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [
    ArticleImageFormComponent,
    ProfileImageFormComponent,
    ContentImageFormComponent,
  ],
  providers: [NgxImageCompressService],
})
export class ImageUploaderModule {}
