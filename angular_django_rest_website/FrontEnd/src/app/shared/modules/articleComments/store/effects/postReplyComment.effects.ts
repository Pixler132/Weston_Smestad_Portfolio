import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { CommentInterface } from 'src/app/shared/interfaces/comment.interface'
import { CommentService } from '../../services/comment.service'

import {
  postCommentAction,
  postCommentFailureAction,
  postCommentSuccessAction,
} from '../actions/postComment.actions'
import { postCommentReplyAction } from '../actions/postReplyComment.actions'

/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class PostReplyCommentEffect {
  getComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postCommentReplyAction),
      switchMap(({ url, comment, reply }) => {
        return this.commentService.postReplyComment(url, comment, reply).pipe(
          map((comment: CommentInterface, reply: any) => {
            return postCommentSuccessAction({ comment })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(postCommentFailureAction())
          }),
        )
      }),
    ),
  )

  constructor(
    private actions$: Actions,
    private commentService: CommentService,
  ) {}
}
