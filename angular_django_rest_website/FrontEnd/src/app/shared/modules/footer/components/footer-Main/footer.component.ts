import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  currentUserSelector,
  isAdminSelector,
  isAnonymousSelector,
  isLoggedInSelector,
} from 'src/app/pages/auth/store/selectors/auth.selectors'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'

@Component({
  selector: 'dz-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
})
export class FooterComponent implements OnInit {
  isLoggedIn$!: Observable<boolean | null>
  isAnonymous$!: Observable<boolean | null>
  currentUser$!: Observable<CurrentUserInterface | null>
  isAdmin$!: Observable<boolean | null>
  hidden: boolean = true
  authhidden: boolean = true

  mainTags: string[] = ['Coding', 'News', 'Tech']

  constructor(private store: Store, private router: Router) {}
  ngOnInit(): void {
    this.initializeListeners()
    this.initializeValues()
  }
  initializeValues() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
    this.isAdmin$ = this.store.pipe(select(isAdminSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }
  initializeListeners(): void {}
  onLoginOpen(): void {
    this.authhidden = false
  }
  onOpen(): void {
    this.hidden = false
  }
  onClickedOutside(e: Event) {
    this.hidden = true
    this.authhidden = true
  }
  onClick(tag: string): void {
    this.router.navigate(['feed', 'tag', tag])
    console.log(this.router.url)
  }
}
/******************************
{

  link:{
    icon:D:\blog\Dz-blog-v-002\src\assets\images\dzonics1 (1).svg
    hyperLink: xyz.com
  }
}





 */
