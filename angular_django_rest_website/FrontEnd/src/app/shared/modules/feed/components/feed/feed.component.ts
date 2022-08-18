import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Observable, Subscription, tap } from 'rxjs'

import { getFeedAction } from '../../store/actions/getFeed.actions'
import {
  articleCountSelector,
  errorsSelector,
  isLoadingSelector,
  selectAllFeed,
} from '../../store/selectors/feed.selectors'
import { HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import { Actions } from '@ngrx/effects'

@Component({
  selector: 'dz-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass'],
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input('apiUrl') aipUrlProps: string
  @Input('tagName') tagName: string
  @Input('author') author: string
  @Input('favorite') favorite: string
  queryPramamsSubscription!: Subscription

  error$!: Observable<string | null>
  isLoading$!: Observable<boolean>

  queryParams!: Params
  baseUrl: string
  baseMedia: string

  limit: number
  currentPage: number
  feed$!: Observable<ArticlesInterface[] | null>
  total$!: Observable<number>
  offset: number
  items: string[] = ['hello', 'world']
  date!: Date
  pageCount: number
  home: boolean = false
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private actions$: Actions,
  ) {
    this.baseMedia = environment.baseMedia
    this.aipUrlProps = ''
    this.tagName = ''
    this.author = ''
    this.favorite = ''
    this.baseUrl = ''
    this.pageCount = 0
    this.currentPage = 0
    this.limit = 10
    this.offset = 0
    console.log(this.router.url)
    if (this.router.url === '/') {
      this.home = true
      console.log(this.home)
    }
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.currentPage = 1

    this.initValues()

    this.initListners()
  }
  ngOnDestroy(): void {}
  initListners() {
    this.queryParams = { page: this.currentPage }
    this.route.queryParams.subscribe((params) => {
      if (params['page'] === undefined) {
      } else {
        this.currentPage = params['page']
      }
    })

    this.fetchFeed()
  }
  initValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.total$ = this.store
      .select(articleCountSelector)
      .pipe(tap((a) => (this.pageCount = Math.round(a / this.limit))))

    this.feed$ = this.store.select(selectAllFeed)

    this.error$ = this.store.pipe(select(errorsSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.offset = this.limit * +this.currentPage - this.limit
  }
  fetchFeed(): void {
    this.offset = this.limit * +this.currentPage - this.limit
    if (!this.tagName) {
      const params = new HttpParams()
        .append('offset', this.offset)
        .append('limit', this.limit)
      let fullUrl = `${this.aipUrlProps}?${params.toString()}`
      this.store.dispatch(getFeedAction({ url: fullUrl }))
      console.log('1')
    } else {
      const params = new HttpParams()
        .append('offset', this.offset)
        .append('limit', this.limit)
        .append('tags', this.tagName)
      let fullUrl = `${this.aipUrlProps}?${params.toString()}`
      console.log('2')
      this.store.dispatch(getFeedAction({ url: fullUrl }))
    }
  }
  onpageUp(page: string): void {
    if (page === 'older') +this.currentPage++
    else if (page === 'newer') +this.currentPage--
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: +this.currentPage },
    })
    window.scroll(0, 0)
    console.log('2')
    this.fetchFeed()
  }
  onPageNavigated(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
    })
  }
  onNav(id: number): void {
    this.router.navigate(['article', id])
  }
  onRemove(id: number): void {
    console.log(this.items, 'asdf', this.items.splice(id, 1))
    this.items.splice(id, 1)
  }
}
