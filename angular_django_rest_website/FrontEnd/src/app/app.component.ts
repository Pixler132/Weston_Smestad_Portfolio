import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Router, Route } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { map, Observable, Subject, Subscription } from 'rxjs'
import { getCurrentUserAction } from './pages/auth/store/actions/auth.getCurrentUser.actions'
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoadingSelector,
  isLoggedInSelector,
} from './pages/auth/store/selectors/auth.selectors'
import { CurrentUserInterface } from './shared/interfaces/currentUser.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  @ViewChild('sidebar') sidebar!: ElementRef
  @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef
  interval!: any
  isOpen: boolean = false
  category!: string[]
  menu: boolean = false
  isLoggedIn$!: Observable<boolean | null>
  isAnonymous$!: Observable<boolean | null>

  offMenuClick: Subject<void> = new Subject<void>()
  currentUser$!: Observable<CurrentUserInterface | null>

  constructor(private store: Store, public router: Router) {}
  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction())
    this.category = ['coding', 'python']
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))

    this.printpath('', this.router.config)
  }
  title = 'dz-blog'

  printpath(parent: String, config: Route[]) {
    for (let i = 0; i < config.length; i++) {
      const route = config[i]
      console.log(parent + '/' + route.path)
      if (route.children) {
        const currentPath = route.path ? parent + '/' + route.path : parent
        this.printpath(currentPath, route.children)
      }
    }
  }

  menuToggle(): void {
    this.sidebar.nativeElement.classList.toggle('-translate-x-full')
    this.isOpen = !this.isOpen
  }
  onClick(tag: string): void {
    this.router.navigate(['feed', 'tag', tag])
    console.log(this.router.url)
    console.log(tag)
  }
  onClickoffMenu() {
    this.offMenuClick.next()
  }
}
const btn = document.querySelector('.mobile-menu-button')
const sidebar = document.querySelector('.sidebar')
let isSidebarOpen = false

// add our event listener for the click
// btn.addEventListener('click', () => {})
