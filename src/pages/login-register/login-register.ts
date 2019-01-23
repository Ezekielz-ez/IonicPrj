import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interface/user';
import { MediaProvider } from '../../providers/media/media';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

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
        this.mediaProvider.autoLogin(token).subscribe(res => {
          this.storage.set('current-user', res).then(result => {
            this.mediaProvider.setLogIn();
            this.navCtrl.parent.select(0);
          });
        });
      }, err => console.log(err));
    }
  }
  // use for loggin user in
  userLogIn() {
    this.mediaProvider.logUserIn(this.userData).subscribe(res => {
      if (res.message === 'Logged in successfully') {
        console.log('uhuh!!!!');
        this.mediaProvider.rememberToken(res.token);
        this.navCtrl.parent.select(0);
      } else {
        console.log('nooooooo');
      }
    });
  }
  // logging user out, also testing performance of storage
  userLogOut() {
    console.log('logging out');
    this.mediaProvider.logUserOut();
  }
}
