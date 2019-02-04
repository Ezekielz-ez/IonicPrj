import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interface/user';
import { MediaProvider } from '../../providers/media/media';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {
  userData: User = {
    'username' : '',
    'password' : ''
  };
  constructor(public navCtrl: NavController, private navParams: NavParams, private mediaProvider: MediaProvider, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
    if (!this.mediaProvider.checkAuto()) {
      this.storage.get('token').then(token => {
        this.mediaProvider.autoLogin(token).subscribe(response => {
          this.storage.set('current-user', response).then(result => {
            console.log(result);
            this.mediaProvider.setLogIn();
            this.navCtrl.parent.select(0);
          }).catch(error => console.log(error));
        });
      }, err => console.log(err)).catch(err => console.log(err));
    }
  }
  // use for loggin user in
  userLogIn() {
    this.mediaProvider.logUserIn(this.userData).subscribe(res => {
      if (res.message === 'Logged in successfully') {
        console.log('uhuh!!!!');
        this.storage.set('current-user', res).then(() => {
          this.storage.set('token', res.token).then(() => {
            this.mediaProvider.setLogIn();
            this.navCtrl.parent.select(0);
          });
        }).catch(err => console.log(err));
      } else {
        console.log('nooooooo');
      }
    });
  }
  // go to registerpage
  goToRegister() {
    this.navCtrl.push(RegisterPage).catch(err => console.log(err));
  }
}
