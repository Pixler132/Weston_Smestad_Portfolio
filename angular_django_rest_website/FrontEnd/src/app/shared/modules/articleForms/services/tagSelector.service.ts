import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable()
export class GetAvailableTagsService {
  constructor(private http: HttpClient) {}

  getAvailableTags() {
    const url = `http://104.254.15.78:8000/verification/taglist/`
    console.log('hi')
    return this.http.get<tagList>(url).pipe(
      map((response: tagList) => {
        return response.tags.MasterTagList
      }),
    )
  }
}
export interface tagList {
  tags: {
    MasterTagList: string[]
  }
}
