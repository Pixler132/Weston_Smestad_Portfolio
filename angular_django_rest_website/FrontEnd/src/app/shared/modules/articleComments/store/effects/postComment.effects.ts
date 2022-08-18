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

/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class PostCommentEffect {
  getComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postCommentAction),
      switchMap(({ url, comment }) => {
        return this.commentService.postComment(url, comment).pipe(
          map((comment: CommentInterface) => {
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
