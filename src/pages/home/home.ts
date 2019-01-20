import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Pic } from '../../interface/pic';
import { MediaProvider } from '../../providers/media/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picArray: Pic[];
  constructor(public navCtrl: NavController, public httpClient: HttpClient, public mediaProvider: MediaProvider) {
  }

  ngOnInit() {
  }

  onCatClick(x: Pic) {
    console.log(x.filename + ' ' + x.title);
  }

  ionViewDidLoad() {
    this.getAllFile();
  }

  getAllFile() {
    this.mediaProvider.getAllMedia().subscribe(data => {
      this.picArray = data;
    });
    console.log(this.picArray);
    /*this.httpClient.get<Pic[]>('http://media.mw.metropolia.fi/wbma/media').subscribe(
      data => {
        console.log(data);
        data.forEach(element => {
          console.log('http://media.mw.metropolia.fi/wbma/uploads/' + element.filename.split('.')[0] + '-tn160.png');
        });
        this.picArray = data;

      }, error => {
        console.log(error);
      });*/
  }
}
