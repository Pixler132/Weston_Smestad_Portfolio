import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TagFeedComponent } from './components/tagFeed/tagFeed.component'
import { RouterModule } from '@angular/router'
import { FeedModule } from 'src/app/shared/modules/feed/feed.module'
const routes = [
  {
    path: 'feed/tag/:slug',
    component: TagFeedComponent,
  },
]
@NgModule({
  declarations: [TagFeedComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FeedModule],
  exports: [],
  providers: [],
})
export class ArticleTagFeedModule {}
