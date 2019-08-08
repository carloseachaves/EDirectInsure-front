import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TaskPage } from '../pages/tasks/task';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage: any = LoginPage;

  constructor(platform: Platform, 
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.storage.get('user').then((val) => {
        if (val!=null){
          this.rootPage = TaskPage;
        }
      });
    });

  }
}
