import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HttpClient } from '@angular/common/http';
import { Pic } from '../../interface/pic';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  picArray: Pic[] = [];
  constructor(public navCtrl: NavController, public httpClient: HttpClient, public mediaProvider: MediaProvider) {
  }

  ngOnInit() {
  }

  onCatClick(x: Pic) {
    console.log(x.filename + ' ' + x.title);
    this.mediaProvider.getSingleMedia(x.file_id).subscribe(data => {
      console.log(data);
    });
    this.getAllFile();
  }

  ionViewDidLoad() {
    this.getAllFile();
  }

  getAllFile() {
    this.mediaProvider.getAllMedia().subscribe(file => {
      file.forEach(pic => {
        this.mediaProvider.getSingleMedia(pic.file_id).subscribe(singlePic => {
          this.picArray.push(singlePic);
        }); });
    });
  }

}
