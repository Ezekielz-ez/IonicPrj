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
  emailValid = false; emailInput = false;
  passwordValid = false; passwordInput = false; passwordLengthValid = false;
  userValid = false; userInput = false;
  formValid = false;
  secondPassword = '';
  userData: User = {
    'username' : '',
    'email' : '',
    'password': '',
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }
  // start page
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  // register new user
  userRegister() {
    console.log('new user');
    this.mediaProvider.registerUser(this.userData).subscribe(response => {
      console.log(response);
      this.mediaProvider.logUserIn({ 'username': this.userData.username, 'password': this.userData.password }).subscribe(res => {
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
  }
  // checking user name on press
  usernameCheck() {
    this.userInput = true;
    this.mediaProvider.checkUsername(this.userData.username).subscribe(res => {
      this.userValid = (res.available === true && this.userData.username.length > 3);
      this.formCheck();
    });
    console.log('click');
  }
  // matching password check
  passwordCheck() {
    this.passwordInput = true;
    this.passwordValid = (this.secondPassword === this.userData.password);
    this.passwordLengthValid = (this.userData.password.length > 4);
    console.log(this.passwordValid);
    this.formCheck();
  }
  // checking email
  emailCheck() {
    this.emailInput = true;
    this.emailValid = this.userData.email.match('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$') !== null;
    console.log(this.userData.email.match('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'));
    this.formCheck();
  }
  // checking the entirety of the form
  formCheck() {
    this.formValid = this.userValid && this.emailValid && this.passwordValid && this.passwordLengthValid;
  }
}


