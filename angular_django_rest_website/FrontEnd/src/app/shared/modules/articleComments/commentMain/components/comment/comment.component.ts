import { DatePipe } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { filter, map, Observable, Subscription, tap } from 'rxjs'
import { currentUserSelector } from 'src/app/pages/auth/store/selectors/auth.selectors'
import { CommentArrayInterface } from 'src/app/shared/interfaces/comment.interface'
import { environment } from 'src/environments/environment'
import { deleteCommentAction } from '../../../store/actions/deleteComment.actions'
import { HttpParams } from '@angular/common/http'
import { postCommentAction } from '../../../store/actions/postComment.actions'
import { updateCommentAction } from '../../../store/actions/updateComment.actions'
import { AurthorInterface } from 'src/app/shared/interfaces/author.interface'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'
import { postCommentReplyAction } from '../../../store/actions/postReplyComment.actions'
import { CommentService } from '../../../services/comment.service'
@Component({
  selector: 'dz-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass'],
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input('apiUrl') aipUrlProps!: string
  //@Input('id') idProps!: number

  @Input('idProps') idProps!: number
  @Input('comment') comment!: CommentArrayInterface

  @Input('replying') replying!: boolean
  @Input('isReply') isReply!: boolean
  @Input('commentId') commentId!: number | null

  edit: boolean
  form!: FormGroup
  commentsSubscription!: Subscription
  comments: CommentArrayInterface[] | null
  baseMedia = environment.baseMedia
  date!: string | null
  pipe = new DatePipe('en-US')
  isAuthor$: Observable<boolean>
  url: any
  limit = 0
  currentPage: number = 0
  newReply: boolean = false
  reply!: CommentArrayInterface | null
  editReply: boolean = false

  author!: AurthorInterface
  currentUser$!: Observable<CurrentUserInterface | null>
  currentUser!: CurrentUserInterface
  constructor(
    private store: Store,
    private fb: FormBuilder,
    public s: CommentService,
  ) {
    this.edit = false
    this.comments = null
    this.isAuthor$ = this.store.pipe(select(currentUserSelector)).pipe(
      map((currentUser) => {
        if (currentUser)
          if (this.comment.author)
            return (
              currentUser.currentUser.userName === this.comment.author.username
            )
        return false
      }),
    )
  }

  ngOnInit(): void {
    this.initializeForm()
    this.initializeListeners()

    this.date = this.pipe.transform(this.comment.creationDate, 'short')
  }
  ngOnDestroy(): void {}
  initializeForm(): void {
    if (this.comment) {
      this.form = this.fb.group({
        content: this.comment.content,
      })
      this.url = environment.editCommentApiUrl + this.comment.comment_id + '/'
    } else {
      this.url = environment.postCommentApiUrl + this.idProps + '/'

      this.form = this.fb.group({ content: '' })
    }
  }
  initializeListeners(): void {
    this.store
      .select(currentUserSelector)
      .pipe(filter((x) => x != null))
      .subscribe((data) => {
        if (data) {
          this.currentUser = data
        }
      })
  }
  test!: boolean

  onEvent(event: any): void {
    switch (event) {
      case 'edit':
        this.onEdit()

        this.newReply = false
        break
      case 'report':
        console.log('report')
        break
      case 'reply':
        this.newReply = true
        this.edit = false
        this.onReply()
        console.log('reply')
        break
      case 'delete':
        this.onDelete()
        break
      case 'deleteReply':
        this.onDeleteReply()
        break
    }
  }
  onSaveReply() {
    let fullUrl = `${environment.postCommentApiUrl}${this.idProps}/`

    let comment = this.form.value
    let reply = { commentId: this.commentId }
    this.store.dispatch(
      postCommentReplyAction({
        url: fullUrl,
        comment: comment,
        reply: reply,
      }),
    )
  }
  onReply() {
    this.newReply = true
    this.reply = {
      content: '',
      author: {
        authorId: this.currentUser.currentUser.id,
        username: this.currentUser.currentUser.userName,
        profileImg: this.currentUser.currentUser.image,
      },
      comment_id: null,
      creationDate: null,
      updatedDate: null,
      replies: null,
    }
  }
  onDeleteReply(): void {
    const params = new HttpParams().set('reply', true)
    let fullUrl = `${environment.DeleteCommentApiUrl}${
      this.comment.comment_id
    }/?${params.toString()}`

    this.store.dispatch(deleteCommentAction({ url: fullUrl }))
  }
  onEdit(): void {
    this.edit = !this.edit
  }
  onDelete(): void {
    let fullUrl = `${environment.DeleteCommentApiUrl}${this.comment.comment_id}/`
    this.store.dispatch(deleteCommentAction({ url: fullUrl }))
  }
  onCancel(type: string): void {
    if (type == 'reply') {
      this.newReply = !this.newReply
    }
    if (type == 'edit') {
      this.edit = !this.edit
    }
  }
  fetchComments(): void {}
  onSave(): void {
    const offset: number = this.limit * this.currentPage - this.limit

    const params = new HttpParams()
      .set('offset', offset)
      .set('limit', this.limit)
    //.set('comment', this.comment.comment_id)

    let fullUrl = `${this.url}`

    // if (this.idProps) {

    //   this.store.dispatch(
    //     postCommentAction({ url: fullUrl, comment: this.form.value }),
    //   )
    // } else {

    //   this.store.dispatch(
    //     updateCommentAction({ url: fullUrl, comment: this.form.value }),
    //   )
    // }
  }
}
