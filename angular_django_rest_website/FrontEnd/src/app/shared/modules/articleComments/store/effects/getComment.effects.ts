import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { CommentInterface } from 'src/app/shared/interfaces/comment.interface'
import { CommentService } from '../../services/comment.service'

import {
  getCommentAction,
  getCommentFailureAction,
  getCommentSuccesAction,
} from '../actions/getComment.actions'

/*
EFFECTS must be declared in the module config


*/
@Injectable()
export class GetCommentEffect {
  getComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCommentAction),
      switchMap(({ url }) => {
        return this.commentService.getComment(url).pipe(
          map((comment: CommentInterface) => {
            console.log(comment)
            return getCommentSuccesAction({ comment })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getCommentFailureAction())
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
