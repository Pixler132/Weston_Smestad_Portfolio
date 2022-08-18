import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { NgxImageCompressService } from 'ngx-image-compress'

//import { ImageFormComponent } from './components/image-form/image-form.component'
import { TitleFormType001Component } from './components/titles/type001/form/titleFormType001.component'
import { FormImageType001Component } from './components/images/type001/form/formImageType001.component'
import { TitleType001Component } from './components/titles/type001/display/titleType001.component'
import { ImageType001Component } from './components/images/type001/display/imageType001.component'
import { MaterialModule } from '../material/material.module'

import { BlockTypeMenuComponent } from './components/block-type-menu/displayType001/blockTypeMenu.component'

import { BodyFormType001Component } from './components/bodys/type001/form/bodyFormType001.component'
import { BodyType001Component } from './components/bodys/type001/display/articleDisplayType005.component'
import { ImageImageType001Component } from './components/imageImage/type001/display/imageImageType001.component'
import { FormImageImageType001Component } from './components/imageImage/type001/form/formImageImageType001.component'
import { ImageTextType001Component } from './components/image-text/type001/display/imageTextType001.component'
import { FormImageTextType001Component } from './components/image-text/type001/form/formImageTextType001.component'
import { TextImageType001Component } from './components/text-image/type001/display/textImageType001.component'
import { FormTextImageType001Component } from './components/text-image/type001/form/formTextImageType001.component'
import { ImageUploaderModule } from '../imageUploader/imageUploader.module'
@NgModule({
  declarations: [
    BlockTypeMenuComponent,
    //ImageFormComponent,

    TitleType001Component,
    TitleFormType001Component,

    ImageType001Component,
    FormImageType001Component,

    ImageImageType001Component,
    FormImageImageType001Component,

    BodyType001Component,
    BodyFormType001Component,

    ImageTextType001Component,
    FormImageTextType001Component,

    TextImageType001Component,
    FormTextImageType001Component,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ImageUploaderModule,
  ],
  exports: [
    // ImageFormComponent,
    BlockTypeMenuComponent,

    TitleType001Component,
    TitleFormType001Component,

    ImageType001Component,
    FormImageType001Component,

    ImageImageType001Component,
    FormImageImageType001Component,

    BodyType001Component,
    BodyFormType001Component,

    ImageTextType001Component,
    FormImageTextType001Component,

    TextImageType001Component,
    FormTextImageType001Component,
  ],
  providers: [NgxImageCompressService],
})
export class ArticleContentBlockModule {}
