import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service'

import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'
import {
  favoriteArticleAction,
  favoriteArticleFailureAction,
  favoriteArticleSuccessAction,
} from '../actions/favoriteArticle.actions'

@Injectable()
export class FavoriteArticleEffect {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteArticleAction),
      switchMap(({ myArticle }) => {
        return this.sharedArticleService
          .onFavorite(myArticle.id, myArticle.favorited)
          .pipe(
            map(() => {
              let newArticle = this.updateFav(myArticle)
              return favoriteArticleSuccessAction({ article: newArticle })
            }),
            catchError((error) => {
              return of(favoriteArticleFailureAction())
            }),
          )
      }),
    ),
  )
  updateFav(myArticle: ArticlesInterface) {
    let newArticle = {
      articleDescription: myArticle.articleDescription,
      articleImage: myArticle.articleImage,
      articleTitle: myArticle.articleTitle,
      author: myArticle.author,
      content: myArticle.content,
      creationDate: myArticle.creationDate,
      favorited: !myArticle.favorited,
      id: myArticle.id,
      tags: myArticle.tags,
      favoriteCount: myArticle.favoriteCount,
      urlGen: myArticle.urlGen,
    }

    return newArticle
  }
  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService,
  ) {}
}
export class updateArticle {}
