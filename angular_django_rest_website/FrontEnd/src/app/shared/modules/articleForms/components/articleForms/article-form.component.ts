import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { ArticleBlockInterface } from 'src/app/shared/interfaces/articleBlock.interface'
import { ArticleInputInterface } from 'src/app/shared/interfaces/articleInput.interface'
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backendError.interface'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'dz-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.sass'],
})
export class ArticleFormComponent implements OnInit, AfterContentInit {
  @Input('initialValues') initialValuesProps!: ArticleInputInterface | null
  @Input('isSubmitting') isSubmittingProps: boolean | null
  @Input('errors') errorsProps!: BackendErrorsInterface | null

  @Output('articleSubmit') articleSubmitEvent = new EventEmitter<
    ArticleInputInterface
  >()
  contentTypes = environment.contentTypes
  form!: FormGroup
  content!: ArticleBlockInterface[]
  position: number
  old_tag_list: string[]
  constructor(private fb: FormBuilder) {
    this.position = 0
    this.isSubmittingProps = false
    this.old_tag_list = []
  }
  updateTaggings(new_tags: any) {
    this.old_tag_list = new_tags
  }
  ngOnInit(): void {}
  ngAfterContentInit(): void {
    this.initializeForm()
    this.initializeValues()
  }
  initializeValues(): void {
    this.position
  }
  initializeForm(): void {
    if (this.initialValuesProps) {
      this.form = this.fb.group({
        //tags: this.initialValuesProps.tags,
        articleTitle: this.initialValuesProps.articleTitle,
        articleDescription: this.initialValuesProps.articleDescription,
        articleImage: this.initialValuesProps.articleImage,
        content: this.fb.array([]),
      })

      this.old_tag_list = this.initialValuesProps.tags
      console.log(this.old_tag_list)
      if (this.initialValuesProps.content == null) {
      } else {
        this.onFill()
      }
    }
  }
  get contentArray(): any {
    return this.form.controls['content'] as FormArray
  }
  onFill(): void {
    let content
    if (this.initialValuesProps) {
      for (let i = 0; i < this.initialValuesProps.content.length; i++) {
        content = this.fb.group({
          title: this.initialValuesProps.content[i].title,
          type: this.initialValuesProps.content[i].type,
          body: this.initialValuesProps.content[i].body,
          imageOne: this.initialValuesProps.content[i].imageOne,
          imageTwo: this.initialValuesProps.content[i].imageTwo,
          position: this.initialValuesProps.content[i].position,
          customObject: this.initialValuesProps.content[i]._customObject,
        })
        this.contentArray.push(content)
      }
    }
  }
  onAddType(type: string): void {
    let content: Object | null = null
    let custom = false
    if (type === this.contentTypes.title) {
      content = this.fb.group({
        title: '',
        type: type,
        position: this.position,
        customObject: custom,
      })
    } else if (type === this.contentTypes.body) {
      content = this.fb.group({
        type: type,
        body: undefined,
        position: this.position,
        customObject: custom,
      })
    } else if (type === this.contentTypes.image) {
      content = this.fb.group({
        type: type,
        imageOne: undefined,
        position: this.position,
        customObject: custom,
      })
    } else if (type === this.contentTypes.imageImage) {
      content = this.fb.group({
        type: type,
        imageOne: undefined,
        imageTwo: undefined,
        position: this.position,
        customObject: custom,
      })
    } else if (type === this.contentTypes.bodyImage) {
      content = this.fb.group({
        type: type,
        body: undefined,
        imageOne: undefined,
        position: this.position,
        customObject: custom,
      })
    } else if (type === this.contentTypes.imageBody) {
      content = this.fb.group({
        type: type,
        body: undefined,
        imageOne: undefined,
        position: this.position,
        customObject: custom,
      })
    }
    if (content !== null) {
      this.position++
      this.contentArray.push(content)
    }
  }

  onSubmit(): void {
    console.log(this.form)
    this.form.value.tags = this.old_tag_list

    for (let i = 0; i < this.contentArray.length; i++) {
      this.contentArray.value[i].position = i
    }
    this.articleSubmitEvent.emit(this.form.value)
  }

  onDelete(index: number): void {
    this.contentArray.removeAt(index)
  }

  move(shift: number, currentIndex: number): void {
    let newIndex: number = currentIndex + shift
    if (newIndex != -1) {
      const currentGroup = this.contentArray.at(currentIndex)

      this.contentArray.removeAt(currentIndex)
      this.contentArray.insert(newIndex, currentGroup)
    }
  }
}
