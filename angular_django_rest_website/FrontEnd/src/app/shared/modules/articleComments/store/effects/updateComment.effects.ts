import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { CommentInterface } from 'src/app/shared/interfaces/comment.interface'
import { CommentService } from '../../services/comment.service'

import {
  updateCommentAction,
  updateCommentFailureAction,
  updateCommentSuccessAction,
} from '../actions/updateComment.actions'

/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class UpdateCommentEffect {
  getComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCommentAction),
      switchMap(({ url, comment }) => {
        return this.commentService.updateComment(url, comment).pipe(
          map((comment: CommentInterface) => {
            return updateCommentSuccessAction({ comment })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(updateCommentFailureAction())
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
