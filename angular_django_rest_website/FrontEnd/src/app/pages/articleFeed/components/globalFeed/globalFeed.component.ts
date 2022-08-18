import { Component, OnDestroy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { map } from 'rxjs'
import { isLoggedInSelector } from 'src/app/pages/auth/store/selectors/auth.selectors'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'dz-global-feed',
  templateUrl: './globalFeed.component.html',
  styleUrls: ['./globalFeed.component.sass'],
})
export class GlobalFeedComponent implements OnInit, OnDestroy {
  apiUrl: string //=

  constructor(private store: Store) {
    this.apiUrl = environment.globalFeedUrl
  }
  ngOnDestroy(): void {}
  ngOnInit(): void {}
}
