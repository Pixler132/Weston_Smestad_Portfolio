import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { CardsModule } from '../Cards/cards.module'
import { PaginationModule } from '../pagination/pagination.module'
import { TrendingFeedModule } from '../trendingFeed/feed.module'

import { FeedComponent } from './components/feed/feed.component'

import { FeedService } from './services/feed.service'
import { GetFeedEffect } from './store/effects/getFeed.effects'
import { feedReducer } from './store/reducer/feed.reducer'

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetFeedEffect]),
    TrendingFeedModule,
    StoreModule.forFeature('feed', feedReducer),

    RouterModule,
    PaginationModule,
    CardsModule,
  ],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
