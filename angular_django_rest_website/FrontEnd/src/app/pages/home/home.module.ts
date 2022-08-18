import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './components/home/home.component'

const route = [{ path: '', component: HomeComponent }]
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule],
  exports: [],
  providers: [],
})
export class homeModule {}
