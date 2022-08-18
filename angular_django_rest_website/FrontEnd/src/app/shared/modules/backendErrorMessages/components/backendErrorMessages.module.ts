import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BackendErrorMessagesComponent } from './backendErrorMessages/backendErrorMessages.component'

@NgModule({
  imports: [CommonModule],
  declarations: [BackendErrorMessagesComponent],
  exports: [BackendErrorMessagesComponent],
})
export class BackendErrorMessagesModule {}
