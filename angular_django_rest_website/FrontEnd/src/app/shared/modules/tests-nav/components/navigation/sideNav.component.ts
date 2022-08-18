import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { DropDownAnimation } from '../../services/dropdown.animations'
@Component({
  selector: 'dz-navigation',
  templateUrl: './sideNav.component.html',
  styleUrls: ['./sideNav.component.sass'],
  animations: [DropDownAnimation],
})
export class NavigationComponent implements OnInit {
  isOpen: boolean = false
  category!: string[]
  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  ngOnInit(): void {
    this.category = ['coding', 'python']
  }
  onClick(tag: string): void {
    this.router.navigate(['feed', 'tag', tag])
    console.log(this.router.url)
    console.log(tag)
  }
}
