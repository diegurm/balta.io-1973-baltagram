import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { PhotosPage } from "../pages/photos/photos";
import { TakePicturePage } from "../pages/take-picture/take-picture";
import { SendPhotoPage } from "../pages/send-photo/send-photo";
import { ProfilePage } from "../pages/profile/profile";
import { ShowMapPage } from "../pages/show-map/show-map";

const config = {
  apiKey: "AIzaSyDsmYmqNPl1Rf3_xP4edwT0-cSJcqtyoHw",
  authDomain: "baltagram-curso-1930.firebaseapp.com",
  databaseURL: "https://baltagram-curso-1930.firebaseio.com/",
  projectId: "baltagram-curso-1930",
  storageBucket: "baltagram-curso-1930.appspot.com",
  messagingSenderId: "32407984045",
  appId: "1:32407984045:web:07eef5e3d808ea1e"
};

@NgModule({
  bootstrap: [IonicApp],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    PhotosPage,
    TakePicturePage,
    SendPhotoPage,
    ProfilePage,
    ShowMapPage
  ],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    PhotosPage,
    TakePicturePage,
    SendPhotoPage,
    ProfilePage,
    ShowMapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
