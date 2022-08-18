import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Page404Component } from './components/404Page/404.component'
const routes = [
  {
    path: '404',
    component: Page404Component,
  },
]
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [],
  declarations: [Page404Component],
})
export class Page404Module {}
