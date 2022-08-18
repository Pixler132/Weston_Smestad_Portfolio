import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './components/login-component/login.component'
import { RegisterComponent } from './components/registation-component/register.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { GetCurrentUserEffect } from './store/effects/auth.getCurrentUser.effects'
import { LoginEffect } from './store/effects/auth.login.effects'
import { LogoutEffect } from './store/effects/auth.logout.effects'
import { RegisterEffect } from './store/effects/auth.register.effects'
import { UpdateCurrentUserEffect } from './store/effects/auth.updateCurrentUser.effects'
import { StoreModule } from '@ngrx/store'
import { authReducer } from './store/reducer/auth.reducer'
import { AuthService } from './services/auth.service'
import { EmailValidationComponent } from './components/emailValidation-component/emailValidation.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UpdateProfileComponent } from './components/updateProfileInfo/updateProfile.component'
import { UsernameComponent } from './components/updateProfileInfo/components/loginDataPage/components/username/username.component'

import { UpdateImageComponent } from './components/updateProfileInfo/components/updateImage/updateImage.component'
import { ArticleContentBlockModule } from 'src/app/shared/modules/articleContentBlock/articleContentBlock.module'
import { NameComponent } from './components/updateProfileInfo/components/aboutPage/components/name/name.component'
import { UpdateLastNameComponent } from './components/updateProfileInfo/components/updateLastName/updateLastName.component'
import { ImageUploaderModule } from 'src/app/shared/modules/imageUploader/imageUploader.module'
import { SpinnerModule } from 'src/app/shared/modules/spinners/spiners.module'
import { MaterialModule } from 'src/app/shared/modules/material/material.module'
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/components/backendErrorMessages.module'
import { HighlightDirective } from './components/registation-component/focus.directive'
import { MatTabsModule } from '@angular/material/tabs'
import { TextFieldModule } from '@angular/cdk/text-field'
import { ValidationEffect } from './store/effects/auth.validation.effects'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { AboutPageComponent } from './components/updateProfileInfo/components/aboutPage/aboutPage.component'
import { BioComponent } from './components/updateProfileInfo/components/aboutPage/components/bio/bio.component'
import { LoginDataPageComponent } from './components/updateProfileInfo/components/loginDataPage/loginDataPage.component'
import { EmailComponent } from './components/updateProfileInfo/components/loginDataPage/components/updateEmail/email.component'
import { PasswordComponent } from './components/updateProfileInfo/components/loginDataPage/components/updatePassword/password.component'

import { PipeModule } from 'src/app/shared/pipes/pipes.module'
//import { UpdateCurrentUserEffect2 } from './store/effects/auth.updateEmailUsername.effects'
const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'verification',
    component: EmailValidationComponent,
  },
  {
    path: 'profileupdate',
    component: UpdateProfileComponent,
  },
]
@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    EmailValidationComponent,
    UpdateProfileComponent,
    UsernameComponent,
    PasswordComponent,
    EmailComponent,
    BioComponent,
    UpdateImageComponent,
    NameComponent,
    UpdateLastNameComponent,
    HighlightDirective,
    AboutPageComponent,
    LoginDataPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ArticleContentBlockModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
      UpdateCurrentUserEffect,
      LogoutEffect,
      ValidationEffect,
      UpdateCurrentUserEffect,
    ]),
    MatTabsModule,
    MatSlideToggleModule,
    TextFieldModule,
    BackendErrorMessagesModule,
    MaterialModule,
    SpinnerModule,
    ImageUploaderModule,
    BrowserAnimationsModule,
    PipeModule,
  ],
  exports: [LoginComponent],
  providers: [AuthService],
})
export class AuthModule {}
