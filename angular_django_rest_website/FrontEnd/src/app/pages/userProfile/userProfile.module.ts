import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { UserProfileService } from './services/userProfile.service'
import { EffectsModule } from '@ngrx/effects'

import { StoreModule } from '@ngrx/store'

import { GetUserProfileEffect } from './store/effects/getUserProfile.effects'
import { FeedModule } from 'src/app/shared/modules/feed/feed.module'
import { UserProfileComponent } from './components/userProfile.component'

import { reducers } from './store/reducer/userProfile.reducer'
import { PipeModule } from 'src/app/shared/pipes/pipes.module'
import { UserImageCard } from './components/userImageCard/userImageCard.component'
import { UserDetailCard } from './components/userDetailCard/userDetailCard.component'
import { UserBioCard } from './components/userBioCard/userBioCard.component'
import { CommentFeedModule } from 'src/app/shared/modules/commentFeed/commentFeed.module'
import { FavoriteFeedModule } from 'src/app/shared/modules/favoriteFeed/commentFeed.module'

const routes = [
  {
    path: 'profile/:user',
    component: UserProfileComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    PipeModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', reducers),
    FeedModule,
    CommentFeedModule,
    FavoriteFeedModule,
  ],
  declarations: [
    UserProfileComponent,

    UserImageCard,
    UserDetailCard,
    UserBioCard,
  ],
  providers: [UserProfileService],
})
export class UserProfileModule {}
