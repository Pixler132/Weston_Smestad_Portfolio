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
  selector: 'dz-profile-images-form',
  templateUrl: './profile-image-form.component.html',
  styleUrls: ['./profile-image-form.component.sass'],
})
export class ProfileImageFormComponent implements OnInit, AfterViewInit {
  @Input() parentFormGroup!: FormGroup
  @Input('initialValues') initialValuesProps!: ArticleInputInterface

  content!: ArticleBlockInterface[]
  image: any
  url: any

  constructor(private imageCompress: NgxImageCompressService) {}
  ngAfterViewInit(): void {}

  ngOnInit() {
    this.initValues()
  }
  initValues(): void {
    this.url = environment.baseMedia + this.parentFormGroup.value.newImage
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
          .compressFile(image, orientation, 50, 50)
          .then((result: DataUrl) => {
            console.warn(
              'Size in bytes is now:',
              this.imageCompress.byteCount(result),
            )
            this.url = result

            this.parentFormGroup.patchValue({ newImage: this.url })
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
