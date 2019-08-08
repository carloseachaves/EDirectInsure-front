import { Component, ViewChild } from '@angular/core';
import { NavController, } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ToastController } from 'ionic-angular';
import { TaskPage } from '../tasks/task';
import { Storage } from '@ionic/storage';

//https://medium.com/@danieltadeu2.dt/ionic-3-login-firebase-5741e64d8edf

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  @ViewChild('user') email;
  @ViewChild('pass') password;

  user: any;

  constructor(public navCtrl: NavController, private userProvider: UserProvider,
    public toastCtrl: ToastController,
    private storage: Storage) {

    
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  public login(): void {

    this.userProvider.login(this.email.value, this.password.value)
    .then((result: any) => {
      this.storage.set('user', result);
      this.navCtrl.setRoot(TaskPage);
    }).catch((error: any) => {
      console.error(error);
      this.presentToast(error.message);
    });
  }

  public register(): void {
    
    this.userProvider.register(this.email.value, this.password.value)
    .then((result: any) => {
      this.email.value = null;
      this.password.value = null;
      this.presentToast('User was added successfully');
    }).catch((error: any) => {
      console.error(error)
      this.presentToast(error.message);
    });
  }

  

}
