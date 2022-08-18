import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { CommentMainComponent } from './commentMain/commentMain.component'
import { CommentService } from './services/comment.service'
import { GetCommentEffect } from './store/effects/getComment.effects'
import { reducers } from './store/reducer/comment.reducer'
import { ReactiveFormsModule } from '@angular/forms'
import { PostCommentEffect } from './store/effects/postComment.effects'
import { UpdateCommentEffect } from './store/effects/updateComment.effects'
import { DeleteCommentEffect } from './store/effects/deleteComment.effects'

import { PipeModule } from '../../pipes/pipes.module'
import { CommentFormComponent } from './commentMain/components/commentForm/commentForm.component'
import { CommentComponent } from './commentMain/components/comment/comment.component'
import { CommentDropDownComponent } from './commentMain/components/comment/dropmenu/commentdropdown.component'
import { MatMenuModule } from '@angular/material/menu'
import { PostReplyCommentEffect } from './store/effects/postReplyComment.effects'

@NgModule({
  declarations: [
    CommentMainComponent,
    CommentFormComponent,
    CommentComponent,
    CommentDropDownComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      GetCommentEffect,
      PostCommentEffect,
      UpdateCommentEffect,
      DeleteCommentEffect,
      PostReplyCommentEffect,
    ]),
    MatMenuModule,
    StoreModule.forFeature('comment', reducers),
    RouterModule,
    ReactiveFormsModule,
    PipeModule,
  ],
  exports: [CommentMainComponent],
  providers: [CommentService],
})
export class CommentModule {}
