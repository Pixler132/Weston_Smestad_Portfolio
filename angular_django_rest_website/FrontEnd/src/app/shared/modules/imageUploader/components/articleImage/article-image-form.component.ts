import { AfterViewInit, Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import {
  DataUrl,
  UploadResponse,
  NgxImageCompressService,
} from 'ngx-image-compress'
import { ArticleBlockInterface } from 'src/app/shared/interfaces/articleBlock.interface'
import { ArticleInputInterface } from 'src/app/shared/interfaces/articleInput.interface'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'dz-article-image-form',
  templateUrl: './article-image-form.component.html',
  styleUrls: ['./article-image-form.component.sass'],
})
export class ArticleImageFormComponent implements OnInit, AfterViewInit {
  @Input() parentFormGroup!: FormGroup
  @Input('initialValues') initialValuesProps!: ArticleInputInterface
  @Input('imageNumber') imageNumber: number
  content!: ArticleBlockInterface[]
  image: any
  url: any

  constructor(private imageCompress: NgxImageCompressService) {
    this.imageNumber = 0
  }
  ngAfterViewInit(): void {}

  ngOnInit() {
    this.initValues()
  }
  initValues(): void {
    this.url = environment.baseMedia + this.parentFormGroup.value.articleImage
  }
  onDeleteImage(): void {
    this.url = ''
    this.parentFormGroup.value.image = this.url
  }

  imgResultBeforeCompress: DataUrl = ''
  imgResultAfterCompress: DataUrl = ''
  imgResultAfterResize: DataUrl = ''
  imgResultUpload: DataUrl = ''
  imgResultMultiple: UploadResponse[] = []

  compressFile() {
    console.log('here')
    return this.imageCompress
      .uploadFile()
      .then(({ image, orientation }: UploadResponse) => {
        console.warn('Size in bytes was:', this.imageCompress.byteCount(image))
        this.imgResultBeforeCompress = image
        this.imageCompress
          .compressFile(image, orientation, 100, 100)
          .then((result: DataUrl) => {
            this.url = result
            this.parentFormGroup.patchValue({ articleImage: this.url })
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

  uploadMultipleFiles() {
    return this.imageCompress
      .uploadMultipleFiles()
      .then((multipleOrientedFiles: UploadResponse[]) => {
        this.imgResultMultiple = multipleOrientedFiles
        console.warn(`${multipleOrientedFiles.length} files selected`)
      })
  }

  uploadAnResize() {
    return this.imageCompress
      .uploadFile()
      .then(({ image, orientation }: UploadResponse) => {
        console.warn('Size in bytes was:', this.imageCompress.byteCount(image))
        console.warn('Compressing and resizing to width 200px height 100px...')

        this.imageCompress
          .compressFile(image, orientation, 50, 50, 200, 100)
          .then((result: DataUrl) => {
            this.imgResultAfterResize = result
            console.warn(
              'Size in bytes is now:',
              this.imageCompress.byteCount(result),
            )
          })
      })
  }
}
