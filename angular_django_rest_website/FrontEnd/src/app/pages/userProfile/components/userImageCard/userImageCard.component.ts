import { Component, Input, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable, combineLatest, filter, map } from 'rxjs'
import { currentUserSelector } from 'src/app/pages/auth/store/selectors/auth.selectors'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'
import { environment } from 'src/environments/environment'
import { UserProfileInterface } from '../../interfaces/userProfile.interface'
import { userProfileSelector } from '../../store/selectors/userProfile.selectors'

@Component({
  selector: 'dz-user-image-card',
  templateUrl: './userImageCard.component.html',
  styleUrls: ['./userImageCard.component.sass'],
})
export class UserImageCard implements OnInit {
  @Input('userProfile') userProfile!: UserProfileInterface
  baseMedia: string = environment.baseMedia
  isCurrentUserProfile$!: Observable<boolean>
  followtemp: boolean = false
  constructor(private store: Store) {}
  ngOnInit(): void {
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
}
