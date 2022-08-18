import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UtilsService } from 'src/app/shared/services/utils.service'

@Component({
  selector: 'dz-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass'],
})
export class PaginationComponent implements OnInit {
  @Input('totalCount') totalCountProps!: number | null
  @Input('currentPage') currentPageProps!: number
  @Input('limit') limitProps!: number
  @Output() newPageNumber = new EventEmitter<number>()
  pagesCount: number
  pageArray: Array<number>
  start: number
  constructor(private utils: UtilsService) {
    this.pageArray = []
    if (this.totalCountProps !== null) {
      this.pagesCount = Math.ceil(this.totalCountProps / this.limitProps)
    } else {
      this.pagesCount = 0
    }
    this.start = 0
  }
  ngOnInit(): void {
    if (this.totalCountProps !== null)
      this.pageArray = this.utils.range(
        1,
        Math.ceil(this.totalCountProps / this.limitProps),
      )
    if (this.currentPageProps < 3 || this.currentPageProps == 3) {
      this.start = 0
    }
    if (
      this.currentPageProps > 3 &&
      this.currentPageProps! < this.pageArray.length - 3
    ) {
      this.start = this.currentPageProps - 4
    }
    if (this.currentPageProps >= this.pageArray.length - 3) {
      this.start = this.pageArray.length - 7
    }
  }
  onNavigate(value: number): void {
    this.newPageNumber.emit(value)
  }
}
