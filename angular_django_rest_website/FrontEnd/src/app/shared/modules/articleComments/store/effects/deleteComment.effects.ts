import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { CommentInterface } from 'src/app/shared/interfaces/comment.interface'
import { CommentService } from '../../services/comment.service'
import {
  deleteCommentAction,
  deleteCommentFailureAction,
  deleteCommentSuccesAction,
} from '../actions/deleteComment.actions'

import {
  getCommentAction,
  getCommentFailureAction,
  getCommentSuccesAction,
} from '../actions/getComment.actions'

/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class DeleteCommentEffect {
  getComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCommentAction),
      switchMap(({ url }) => {
        return this.commentService.deleteComment(url).pipe(
          map((comment: CommentInterface) => {
            return deleteCommentSuccesAction({ comment })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(deleteCommentFailureAction())
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
