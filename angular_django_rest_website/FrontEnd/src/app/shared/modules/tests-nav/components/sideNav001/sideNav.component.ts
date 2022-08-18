import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
  HostListener,
} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { fromEvent, Observable, Subscription } from 'rxjs'
import { logoutAction } from 'src/app/pages/auth/store/actions/auth.sync.actions'
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector,
} from 'src/app/pages/auth/store/selectors/auth.selectors'
import { CurrentUserInterface } from 'src/app/shared/interfaces/currentUser.interface'
import { environment } from 'src/environments/environment'
import { DropDownAnimation } from '../../services/dropdown.animations'
@Component({
  selector: 'dz-sidenav-001',
  templateUrl: './sideNav.component.html',
  styleUrls: ['./sideNav.component.sass'],
  animations: [DropDownAnimation],
})
export class SideNav001Component implements OnInit, OnDestroy {
  @ViewChild('sidebar') sidebar!: ElementRef
  @Input() events!: Observable<void>
  @HostListener('window:resize', ['$event'])
  sizeChange(event: any) {
    const a = event.target.innerWidth
    if (event.target.innerWidth < 767) if (this.menuIsOpen) this.menuToggle()
  }

  eventsSubscription!: Subscription

  isOpen: boolean = false
  menuIsOpen: boolean = false

  baseMedia: string = environment.baseMedia
  category!: string[]

  currentUser$!: Observable<CurrentUserInterface | null>
  isLoggedIn$!: Observable<boolean | null>
  isAnonymous$!: Observable<boolean | null>

  resizeObservable$!: Observable<Event>
  resizeSubscription$!: Subscription

  constructor(
    private router: Router,
    private store: Store,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this._activatedRoute.paramMap.subscribe((params) => {
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.initializeListeners()
    this.initializeValues()
  }
  initializeValues(): void {
    this.category = ['coding', 'python', 'coding', 'python', 'coding', 'python']
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
  }

  initializeListeners(): void {
    window.dispatchEvent(new Event('resize'))
    if (this.events)
      this.eventsSubscription = this.events.subscribe(() => {
        if (this.menuIsOpen) {
          this.menuToggle()
        }
      })
  }
  menuToggle(): void {
    this.sidebar.nativeElement.classList.toggle('-translate-x-full')
    this.menuIsOpen = !this.menuIsOpen
    console.log('asdf')
  }
  onTagClick(tag: string): void {
    this.router.navigate(['feed', 'tag', tag])
  }

  onLogout(): void {
    console.log('hello')
    this.store.dispatch(logoutAction())
  }
  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe()
  }
}
