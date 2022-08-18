import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { FeedModule } from 'src/app/shared/modules/feed/feed.module'
import { TrendingFeedModule } from 'src/app/shared/modules/trendingFeed/feed.module'

import { GlobalFeedComponent } from './components/globalFeed/globalFeed.component'

const routes = [{ path: '', component: GlobalFeedComponent }]
@NgModule({
  declarations: [GlobalFeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    TrendingFeedModule,
    // BannerModule,
    // PopularTagsModule,
    // FeedTogglerModule,
  ],
  exports: [],
  providers: [],
})
export class GlobalFeedModule {}
