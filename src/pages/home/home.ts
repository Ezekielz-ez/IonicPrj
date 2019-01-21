import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Pic } from '../../interface/pic';
import { MediaProvider } from '../../providers/media/media';
import {Observable} from "rxjs";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
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
