import { Component, OnDestroy, OnInit } from '@angular/core'

import { Observable, Subscription, combineLatest } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { getUserProfileAction } from '../store/actions/getUserProfile.actions'
import { ActivatedRoute, Router, Params } from '@angular/router'

import { map, filter } from 'rxjs/operators'
import { UserProfileInterface } from '../interfaces/userProfile.interface'
import {
  errorSelector,
  isLoadingSelector,
  userProfileSelector,
} from '../store/selectors/userProfile.selectors'
import { currentUserSelector } from 'src/app/pages/auth/store/selectors/auth.selectors'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'dz-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.sass'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile!: UserProfileInterface
  isLoading$!: Observable<boolean>
  baseMedia: string = environment.baseMedia
  error$!: Observable<string | null>
  userProfileSubscription!: Subscription
  slug: string
  isCurrentUserProfile$!: Observable<boolean>
  followtemp: boolean = false
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.slug = ''
  }
  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }
  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('user') || ''
    console.log(this.slug)
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.isCurrentUserProfile$ = combineLatest([
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean)),
    ]).pipe(
      map(
        ([currentUser, userProfile]: [
          CurrentUserInterface,
          UserProfileInterface,
        ]) => {
          return currentUser.currentUser.userName === userProfile.userName
        },
      ),
    )
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile) => {
        if ((this, userProfile)) this.userProfile = userProfile
        console.log(userProfile)
      })
    console.log(this.slug)
    this.route.params.subscribe((params: Params) => {
      this.slug = params['user']
      this.fetchUserProfile()
    })
  }

  fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }))
  }
}
