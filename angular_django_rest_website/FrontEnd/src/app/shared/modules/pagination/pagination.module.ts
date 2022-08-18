import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatPaginatorModule } from '@angular/material/paginator'
import { RouterModule } from '@angular/router'
import { UtilsService } from '../../services/utils.service'

import { PaginationComponent } from './filler/components/pagination/pagination.component'

@NgModule({
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  imports: [CommonModule, RouterModule, MatPaginatorModule],
  providers: [UtilsService],
})
export class PaginationModule {}
