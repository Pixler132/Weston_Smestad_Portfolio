import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SideNav001Component } from './components/sideNav001/sideNav.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../material/material.module'
import { NavigationComponent } from './components/navigation/sideNav.component'

@NgModule({
  declarations: [SideNav001Component, NavigationComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [SideNav001Component, NavigationComponent],
  providers: [],
})
export class NavigationModule {}
