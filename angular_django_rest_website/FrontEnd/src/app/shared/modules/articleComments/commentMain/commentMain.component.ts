import { HttpParams } from '@angular/common/http'
import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import {
  CommentInterface,
  CommentArrayInterface,
} from 'src/app/shared/interfaces/comment.interface'
import { AppStateInterface } from 'src/app/shared/store/state/app.state'
import { environment } from 'src/environments/environment'
import { deleteCommentAction } from '../store/actions/deleteComment.actions'
import { getCommentAction } from '../store/actions/getComment.actions'
import { postCommentAction } from '../store/actions/postComment.actions'
import { updateCommentAction } from '../store/actions/updateComment.actions'
import {
  commentSelector,
  isLoadingSelector,
} from '../store/selectors/comment.selectors'

@Component({
  selector: 'dz-comment-main',
  templateUrl: './commentMain.component.html',
  styleUrls: ['./commentMain.component.sass'],
})
export class CommentMainComponent implements OnInit, OnDestroy {
  @Input('apiUrl') aipUrlProps!: string
  @Input('id') idProps!: number
  @Input('initialValues') initialValuesProps!: CommentInterface[]
  form!: FormGroup
  commentsSubscription: Subscription = new Subscription()
  comments: CommentArrayInterface[] | null
  error$!: Observable<string | null>
  isLoading$!: Observable<boolean>
  baseUrl!: string
  limit: number
  currentPage: number
  total!: number

  baseMedia: string
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.comments = null
    this.limit = 10
    this.currentPage = 1
    this.baseMedia = environment.baseMedia
  }

  ngOnInit(): void {
    console.log()
    this.initializeValues()
    this.initializeListeners()
    this.fetchComments()
  }
  ngOnDestroy(): void {}
  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
  }
  initializeForm(): void {}
  initializeListeners(): void {
    this.commentsSubscription = this.store
      .pipe(select(commentSelector))
      .subscribe((comments: CommentInterface | null) => {
        if (comments) {
          this.comments = comments.commentFeed.comments
          console.log(comments)
        }
      })
  }

  fetchComments(): void {
    const offset: number = this.limit * this.currentPage - this.limit
    console.log(offset)
    const params = new HttpParams()
    // .set('offset', offset)
    // .set('limit', this.limit)

    let fullUrl = `/${this.aipUrlProps}?${params.toString()}`
    this.store.dispatch(getCommentAction({ url: fullUrl }))
  }
}
