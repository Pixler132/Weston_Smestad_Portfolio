// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export interface ContentTypes {
  title: string
  image: string
  body: string
  imageImage: string
  imageBody: string
  bodyImage: string
  textText: string
}
export const environment = {
  production: false,
  baseUrl: 'http://104.254.15.78:8000/api',
  baseMedia: 'http://104.254.15.78:8000/',

  contentTypes: {
    title: 'title',
    image: 'image',
    body: 'body',
    imageImage: 'image-image',
    imageBody: 'image-body',
    bodyImage: 'body-image',
    textText: 'text-text',
  },

  //comments: src\app\pages\article\components\article\article.component.ts
  getCommentsApiUrl: `article/commentFeed/`, // (+ '${article.id}')

  //globelFeed: src\app\pages\articleFeed\components\globalFeed\globalFeed.component.ts
  globalFeedUrl: '/listArticle/',

  //articleTagFeed.component.ts
  tagFeedUrl: '/listArticle/', // (+ '${tagName}')

  //auth: src\app\pages\auth\services\auth.service.ts
  authLoginApiUrl: '/usermanagement/login/',
  authRegisterApiUrl: '/usermanagement/register/',
  authAutoLoginApiUrl: '/usermanagement/autoLogin/',
  authLogoutApiUrl: '/usermanagement/logout/',

  //create article: src\app\pages\createArticle\services\createArticle.service.ts
  createArticleApiUrl: `/article/`,

  //get article src\app\shared\services\article.service.ts
  getArticleApiUrl: `/article/`, //todo:(+ '${article.id}/')?chapter=3
  favoriteApiUrl: `/article/favorite/`, // not implemented (+ '${article.id}/'),

  //edit article: src\app\pages\editArticle\services.ts
  editArticleApiUrl: `/article/edit/`, // (+ '${article.id}/')

  //delete article: src\app\pages\deleteArticle\services.ts
  deleteArticleApiUrl: `/article/edit/`, //(+ '${article.id}/')

  //comments src\app\shared\modules\articleComments\services\comment.service.ts
  editCommentApiUrl: `/article/edit/comment/`, //todo: not implemented (+ '${comment.id}/')
  DeleteCommentApiUrl: `/article/edit/comment/`, //todo: not implemented (+ '${comment.id}/')
  postCommentApiUrl: `/article/comment/`, //todo: not implemented (+ '${article.id}/')

  //TODO: create

  favoritedFeedApiUrl: `/listArticle/favorite/`, //todo: not implemented (+ '${user.id}/'),
  //userProfile:
  authProfileApiUrl: '/usermanagement/profileUpdate/', //todo: not implemented

  profileApiUrl: `/usermanagement/profile/`, //todo: not implemented (+ '${user.id}/'),
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
//todo: change tags to listing of opations
