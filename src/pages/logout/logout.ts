import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { User } from '../../interface/user';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  private currentUser: User = {
    username: '',
    email: ''
  };
  private profile_id: {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
    this.getProfilePic();
  }
  // run when page enter
  ionViewWillEnter() {
    console.log('1111111111111111111111111111');
    this.getProfilePic();
  }
  // log user out
  userLogOut() {
    console.log('logging out');
    this.mediaProvider.logUserOut();
    this.navCtrl.parent.select(1);
  }
  // get profile pic
  getProfilePic() {
    this.storage.get('token').then(token => {
      this.mediaProvider.getUserData(token).subscribe(ans => {
        console.log(ans);
        this.storage.set('current-user', ans).then(() => {
          this.storage.get('current-user').then(res => {
            console.log(res);
            this.currentUser = res;
            console.log(this.currentUser);
            this.mediaProvider.getProfilePic(this.currentUser.user_id).then(ans => {
              this.profile_id = ans;
              console.log(this.profile_id);
            });
          });
        });
      });
    });
  }
}
