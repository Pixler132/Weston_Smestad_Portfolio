import { HttpParams } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'dz-tag-feed',
  templateUrl: './tagFeed.component.html',
  styleUrls: ['./tagFeed.component.scss'],
})
export class TagFeedComponent implements OnInit {
  tagName: string
  apiUrl: string

  constructor(private route: ActivatedRoute, private router: Router) {
    this.tagName = ''
    this.apiUrl = ''
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false
    }
  }

  ngOnInit(): void {
    this.tagName = this.route.snapshot.paramMap.get('slug') || ''
    this.apiUrl = environment.tagFeedUrl //+ this.tagName
  }
  getApiUrl(): string {
    return this.apiUrl
  }
}
/*
/articleList/?user=<id>/offset=0&limit=10
/articleList/?tag=tag,tag,tag/offset=0&limit=10

*/
