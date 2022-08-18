import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'

import { AuthModule } from './pages/auth/auth.module'
import { PersistanceService } from './shared/services/persistance.service'
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'

import { ArticleModule } from './pages/article/article.module'
import { CreateArticlesModule } from './pages/createArticle/createArticles.module'
import { AuthInterceptor } from './shared/services/auth.interceptor.service'
import { EditArticlesModule } from './pages/editArticle/editArticles.module'
import { GlobalFeedModule } from './pages/articleFeed/globalFeed.module'
import { ArticleTagFeedModule } from './pages/articleTagFeed/articleTagFeed.module'
import { UserProfileModule } from './pages/userProfile/userProfile.module'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './shared/modules/material/material.module'

import { FooterComponentModule } from './shared/modules/footer/footer.module'

import { NavigationModule } from './shared/modules/tests-nav/navigation.module'
import { Page404Module } from './pages/404/404.module'
import { CommentFeedModule } from './shared/modules/commentFeed/commentFeed.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NavigationModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFTOKEN',
    }),
    StoreModule.forRoot({}, {}),
    MaterialModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

    FooterComponentModule,
    EffectsModule.forRoot([]),
    CommentFeedModule,
    StoreRouterConnectingModule.forRoot(),

    AuthModule,
    GlobalFeedModule,
    UserProfileModule,
    ArticleTagFeedModule,
    CreateArticlesModule,
    ArticleModule,
    EditArticlesModule,
    Page404Module,

    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    PersistanceService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
