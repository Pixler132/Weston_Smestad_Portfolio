export const environment = {
  production: true,
  baseUrl: 'http://104.254.15.78:8000/api',

  //comments: . location article componet ts
  commentsUrl: `article/"this.id"/commentFeed/`, //todo: not implemented
  globalFeedUrl: '/article/listArticle/',

  //articleTagFeed.component.ts
  tagFeedUrl: '/listArticle/tags/?tags=', //todo: not implemented

  //auth: src\app\pages\auth\services\auth.service.ts
  authLoginApiUrl: '/usermanagement/login/',
  authRegisterApiUrl: '/usermanagement/register/',
  authAutoLoginApiUrl: '/usermanagement/autoLogin/',
  authLogoutApiUrl: '/usermanagement/logout/',

  //create article: src\app\pages\createArticle\services\createArticle.service.ts
  createArticleApiUrl: `"environment.baseUrl"/article/`, //todo: not implemented
  //edit article: src\app\pages\editArticle\services.ts
  editArticleAprUrl: `"environment.baseUrl"/article/edit/"id"/`, //todo: not implemented

  //TODO: create
  //userProfile:
  authProfileApiUrl: '/usermanagement/profileUpdate/',
  favoritedFeedApiUrl: `/articleList/favorite/"user.id"`,
}
