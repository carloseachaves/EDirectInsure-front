import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TaskPage } from '../pages/tasks/task';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { UserProvider } from '../providers/user/user';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';


export const firebaseConfig = {
  apiKey: "AIzaSyDkcLcfYGpaSdshDwassnN7DHtG8Yk7GG4",
  authDomain: "edirectinsure.firebaseapp.com",
  databaseURL: "https://edirectinsure.firebaseio.com",
  projectId: "edirectinsure",
  storageBucket: "",
  messagingSenderId: "1090606344210",
  appId: "1:1090606344210:web:cab11bf7ab84873c"
};

@NgModule({
  declarations: [
    MyApp,
    TaskPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TaskPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider
  ]
})
export class AppModule {}
