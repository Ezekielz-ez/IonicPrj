import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interface/user';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  valid = false;
  userData: User = {
    'username' : '',
    'email' : '',
    'password': '',
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  // register new user
  userRegister() {
    console.log('new user');
    this.mediaProvider.checkUsername(this.userData.username).subscribe(res => {
      if (res.available === true) {
        this.mediaProvider.registerUser(this.userData).subscribe(res => {
          console.log(res);
          this.mediaProvider.logUserIn({ 'username': this.userData.username, 'password': this.userData.password}).subscribe(res => {
            if (res.message === 'Logged in successfully') {
              console.log('uhuh!!!!');
              this.mediaProvider.rememberToken(res.token);
              this.navCtrl.parent.select(0);
            } else {
              console.log('nooooooo');
            }
          });
        }, err => {console.log(err);
        });
      } else {

      }
    });
  }

}


