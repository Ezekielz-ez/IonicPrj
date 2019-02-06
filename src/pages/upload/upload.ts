import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Storage } from '@ionic/storage';
import { FileEntry } from '@ionic-native/file';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  title = '';
  description = '';
  file: File;
  fileValid: boolean; titleValid: boolean;
  fileInput = false;
  formData: FormData;
  isImage = false; isAudio = false; isVideo = false;
  pathToFile = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider, private storage: Storage, private loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }
  // upload file
  uploadFile() {
    const uploadSpinner = this.loadCtrl.create({
      content: 'uploading to server',
    });
    uploadSpinner.present().catch(err => console.log(err));
    console.log('uploading this:');
    this.formData = new FormData();
    this.formData.append('file', this.file);
    this.formData.append('title', this.title);
    this.formData.append('description', this.description);
    this.storage.get('token').then(token => {
      this.mediaProvider.sendMedia(this.formData, token).subscribe(res => {
        console.log(res);
        setTimeout(() => {
          uploadSpinner.dismiss().catch(error => console.log(error));
          console.log('timeout');
          this.navCtrl.pop().catch(err => console.log(err));
        }, 2000);
      });
    });
  }
  // check file content
  checkFile(event: any) {
    this.pathToFile = '';
    this.fileInput = true;
    console.log(event.target.files[0].type.substring(0, 5));
    this.fileValid = event.target.files[0].type.substring(0, 5) === 'video' || event.target.files[0].type.substring(0, 5) === 'image' || event.target.files[0].type.substring(0, 5) === 'audio';
    this.isAudio = event.target.files[0].type.substring(0, 5) === 'audio';
    this.isVideo = event.target.files[0].type.substring(0, 5) === 'video';
    this.isImage = event.target.files[0].type.substring(0, 5) === 'image';
    if (this.fileValid) {
      this.file = event.target.files[0];
      console.log('file assigned');
      console.log(this.file);
      const reader = new FileReader();
      reader.onloadend = (evt) => {
        console.log('read success');
        console.log(evt.target.result);
        this.pathToFile = evt.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  // title checking not null
  checkTitle() {
    this.titleValid = this.title !== '';
  }
}
