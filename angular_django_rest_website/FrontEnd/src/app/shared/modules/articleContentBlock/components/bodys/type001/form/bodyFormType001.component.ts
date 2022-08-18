import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import {
  NgxImageCompressService,
  DataUrl,
  UploadResponse,
} from 'ngx-image-compress'
import { ArticleBlockInterface } from 'src/app/shared/interfaces/articleBlock.interface'
import { ArticleInputInterface } from 'src/app/shared/interfaces/articleInput.interface'

@Component({
  selector: 'dz-body-form-type-001',
  templateUrl: './bodyFormType001.component.html',
  styleUrls: ['./bodyFormType001.component.sass'],
})
export class BodyFormType001Component implements OnInit {
  @Input() parentFormGroup!: FormGroup

  @Input('initialValues') initialValuesProps!: ArticleInputInterface

  content!: ArticleBlockInterface[]
  image: any
  url: any

  constructor(private imageCompress: NgxImageCompressService) {}

  ngOnInit() {
    this.url = this.parentFormGroup.value.image
  }

  imgResultBeforeCompress: DataUrl = ''
  imgResultAfterCompress: DataUrl = ''
  imgResultAfterResize: DataUrl = ''
  imgResultUpload: DataUrl = ''
  imgResultMultiple: UploadResponse[] = []

  compressFile() {
    return this.imageCompress
      .uploadFile()
      .then(({ image, orientation }: UploadResponse) => {
        this.imgResultBeforeCompress = image

        this.imageCompress
          .compressFile(image, orientation, 50, 50)
          .then((result: DataUrl) => {
            this.url = result
            this.parentFormGroup.value.image = this.url
            console.log(
              'image initialValues: ',
              this.parentFormGroup.value.image,
            )
          })
      })
  }

  uploadFile() {
    return this.imageCompress
      .uploadFile()
      .then(({ image, orientation }: UploadResponse) => {
        this.imgResultUpload = image
      })
  }
}
