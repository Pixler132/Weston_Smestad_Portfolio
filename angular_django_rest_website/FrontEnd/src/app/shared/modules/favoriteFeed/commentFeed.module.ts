import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { PipeModule } from '../../pipes/pipes.module'
import { CardsModule } from '../Cards/cards.module'
import { PaginationModule } from '../pagination/pagination.module'
import { FavoriteComponent } from './components/favorite/profileFavorite.component'
import { FavoriteFeedComponent } from './components/favoriteFeed/favoriteFeed.component'

import { FavoriteFeedService } from './services/commentFeed.service'
import { GetFavoriteFeedEffect } from './store/effects/getFavoriteFeed.effects'
import { FavoriteFeedReducer } from './store/reducer/favoriteFeed.reducer'

@NgModule({
  declarations: [FavoriteComponent, FavoriteFeedComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetFavoriteFeedEffect]),
    StoreModule.forFeature('FavoriteFeed', FavoriteFeedReducer),
    RouterModule,
    PaginationModule,
    CardsModule,
    PipeModule,
  ],
  exports: [FavoriteFeedComponent],
  providers: [FavoriteFeedService],
})
export class FavoriteFeedModule {}
