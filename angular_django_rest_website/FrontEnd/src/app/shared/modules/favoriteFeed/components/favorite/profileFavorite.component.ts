import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { Actions } from '@ngrx/effects'
import { FavoriteArticle } from '../../interfaces/getFavoriteFeedResponce.interface'

@Component({
  selector: 'dz-pro-favorite',
  templateUrl: './profileFavorite.component.html',
  styleUrls: ['./profileFavorite.component.sass'],
})
export class FavoriteComponent implements OnInit, OnDestroy, OnChanges {
  @Input('favorite') favorite!: FavoriteArticle
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
  initValues(): void {}
  fetchFeed(): void {}
  onpageUp(page: string): void {}
  onPageNavigated(page: number): void {}
  onNav(id: number): void {}
  onRemove(id: number): void {}
}
