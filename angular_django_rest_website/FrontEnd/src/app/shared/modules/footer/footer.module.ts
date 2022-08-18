import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MaterialModule } from '../material/material.module'
import { FooterComponent } from './components/footer-Main/footer.component'

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    // FontAwesomeModule,
  ],
  exports: [FooterComponent],
  providers: [],
})
export class FooterComponentModule {}
