import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DateAgoPipe } from './date-ago.pipe'
import { LimitPipe } from './textLimit.pipe'

@NgModule({
  declarations: [DateAgoPipe, LimitPipe],
  imports: [CommonModule],
  exports: [DateAgoPipe, LimitPipe],
  providers: [],
})
export class PipeModule {}
