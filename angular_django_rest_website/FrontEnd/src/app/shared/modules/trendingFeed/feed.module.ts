import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { CardsModule } from '../Cards/cards.module'
import { PaginationModule } from '../pagination/pagination.module'

import { TrendingFeedComponent } from '../trendingFeed/components/trendingFeed/trendingFeed.component'

import { TrendingFeedService } from './services/TrendingFeed.service'
import { GetTrendingFeedEffect } from './store/effects/getTrendingFeed.effects'
import { TrendingFeedReducer } from './store/reducer/TrendingFeed.reducer'

@NgModule({
  declarations: [TrendingFeedComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetTrendingFeedEffect]),
    StoreModule.forFeature('trendingFeed', TrendingFeedReducer),

    RouterModule,
    PaginationModule,
    CardsModule,
  ],
  exports: [TrendingFeedComponent],
  providers: [TrendingFeedService],
})
export class TrendingFeedModule {}
