import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { LogoutPage } from '../pages/logout/logout';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { UploadPage } from '../pages/upload/upload';

import { MediaProvider } from '../providers/media/media';
import { PipesModule } from '../pipes/pipes.module';
import { ThumbnailPipe } from '../pipes/thumbnail/thumbnail';

@NgModule({
  declarations: [
    MyApp,
    LoginRegisterPage,
    RegisterPage,
    HomePage,
    LogoutPage,
    TabsPage,
    UploadPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PipesModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginRegisterPage,
    RegisterPage,
    HomePage,
    LogoutPage,
    UploadPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    PipesModule,
    ThumbnailPipe,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider,
  ]
})
export class AppModule {}
