import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { Actions } from '@ngrx/effects'
import { HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

import { getFavoriteFeedAction } from '../../store/actions/getFavoriteFeed.actions'
import { FavoriteArticle } from '../../interfaces/getFavoriteFeedResponce.interface'
import { selectAllFeed } from '../../store/selectors/favoriteFeed.selectors'

@Component({
  selector: 'dz-favoriteFeed',
  templateUrl: './favoriteFeed.component.html',
  styleUrls: ['./favoriteFeed.component.sass'],
})
export class FavoriteFeedComponent implements OnInit, OnDestroy, OnChanges {
  limit: number = 0
  currentPage: number = 0
  favoriteFeed$!: Observable<FavoriteArticle[] | null>
  total$!: Observable<number>
  offset: number = 0
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private actions$: Actions,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.initValues()

    this.initListners()
  }
  ngOnDestroy(): void {}
  initListners() {
    this.fetchFeed()
  }
  initValues(): void {
    this.favoriteFeed$ = this.store.select(selectAllFeed)
  }
  fetchFeed(): void {
    this.offset = this.limit * +this.currentPage - this.limit

    const params = new HttpParams()
      .append('offset', this.offset)
      .append('limit', this.limit)
    //let fullUrl = `${this.aipUrlProps}?${params.toString()}`
    this.store.dispatch(
      getFavoriteFeedAction({
        url: '/feed/?type=favorite&user=mattster416&offset=0&limit=100',
      }),
    )
    console.log('1')
  }
  onpageUp(page: string): void {}
  onPageNavigated(page: number): void {}
  onNav(id: number): void {}
  onRemove(id: number): void {}
}
