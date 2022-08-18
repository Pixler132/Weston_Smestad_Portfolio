import { HttpParams } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { ArticleBlockInterface } from 'src/app/shared/interfaces/articleBlock.interface'

import { CommentArrayInterface } from 'src/app/shared/interfaces/comment.interface'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'
import { environment } from 'src/environments/environment'
import { postCommentAction } from '../../../store/actions/postComment.actions'
import { updateCommentAction } from '../../../store/actions/updateComment.actions'
import { currentUserSelector } from 'src/app/pages/auth/store/selectors/auth.selectors'
@Component({
  selector: 'dz-comment-form',
  templateUrl: './commentForm.component.html',
  styleUrls: ['./commentForm.component.sass'],
})
export class CommentFormComponent implements OnInit {
  @Input('comment') comment!: CommentArrayInterface | null
  @Input('idProps') idProps!: number
  @Input('commentId') commentId!: number | null
  @Input('isReply') isReply: boolean = false
  @Input('test') test?: boolean
  @Output() cancelEdit = new EventEmitter()
  form!: FormGroup
  limit = 0
  currentPage: number = 0
  content!: ArticleBlockInterface[]
  image: any
  url: any
  baseMedia = environment.baseMedia
  currentUser$!: Observable<CurrentUserInterface | null>
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.initializeValues()
    this.initializeForm()
  }
  initializeValues(): void {
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }

  initializeForm(): void {
    //this.contentBlockArray = [{ title: '', body: '', type: 1, image: '' }]
    if (this.comment) {
      this.form = this.fb.group({
        content: this.comment.content,
      })
    } else {
      this.form = this.fb.group({ content: '' })
    }
  }
  onCancel(): void {
    this.cancelEdit.emit()
  }
  onEvent($event: any) {
    console.log($event)
  }
  onSave(): void {
    if (this.commentId) {
      const params = new HttpParams().set('reply', true)
      this.url = `${
        environment.postCommentApiUrl + this.commentId
      }/?${params.toString()}`
      this.store.dispatch(
        postCommentAction({ url: this.url, comment: this.form.value }),
      )
    } else {
      if (this.idProps) {
        this.url = `${environment.postCommentApiUrl + this.idProps}/`
        console.log(this.idProps)
        this.store.dispatch(
          postCommentAction({ url: this.url, comment: this.form.value }),
        )
      } else if (this.isReply) {
        const params = new HttpParams().set('reply', true)
        this.url = `${
          environment.editCommentApiUrl + this.comment?.comment_id
        }/?${params.toString()}`

        this.store.dispatch(
          updateCommentAction({ url: this.url, comment: this.form.value }),
        )
      } else {
        this.url = `${
          environment.editCommentApiUrl + this.comment?.comment_id
        }/`

        this.store.dispatch(
          updateCommentAction({ url: this.url, comment: this.form.value }),
        )
      }
    }
  }
}
