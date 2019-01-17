import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Pic } from '../../interface/pic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picArray: Pic[];
  constructor(public navCtrl: NavController, public httpClient: HttpClient) {
  }

  ngOnInit() {
    this.getPic();
  }

  onCatClick(x: Pic) {
    console.log(x.original + ' ' + x.title);
  }

  getPic() {
    this.httpClient.get<Pic[]>('/assets/json/test.json').subscribe(
      data => {
        console.log(data);
        this.picArray = data;
      }, error => {
        console.log(error);
      });
  }
}
