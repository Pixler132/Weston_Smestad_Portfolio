import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SpinnerComponent001 } from './components/spinnerType001/spinner.component'

@NgModule({
  imports: [CommonModule],
  declarations: [SpinnerComponent001],
  exports: [SpinnerComponent001],
})
export class SpinnerModule {}
