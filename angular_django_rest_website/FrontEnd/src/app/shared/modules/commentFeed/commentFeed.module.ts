import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { PipeModule } from '../../pipes/pipes.module'
import { CardsModule } from '../Cards/cards.module'
import { PaginationModule } from '../pagination/pagination.module'
import { ProfileCommentComponent } from './components/comment/profileComment.component'
import { CommentFeedComponent } from './components/commentFeed/commentFeed.component'
import { CommenetFeedService } from './services/commentFeed.service'
import { GetCommentFeedEffect } from './store/effects/getProfileCommentFeed.effects'
import { CommentFeedReducer } from './store/reducer/CommentFeed.reducer'

@NgModule({
  declarations: [ProfileCommentComponent, CommentFeedComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetCommentFeedEffect]),
    StoreModule.forFeature('CommentFeed', CommentFeedReducer),
    RouterModule,
    PaginationModule,
    CardsModule,
    PipeModule,
  ],
  exports: [CommentFeedComponent],
  providers: [CommenetFeedService],
})
export class CommentFeedModule {}
