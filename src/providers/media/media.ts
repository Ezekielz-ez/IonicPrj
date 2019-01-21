import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pic } from '../../interface/pic';
// import { of } from 'rxjs/observable/of';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  picArray: Pic[];
  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAllMedia(): Observable<Pic[]> {
    return this.http.get<Pic[]>('http://media.mw.metropolia.fi/wbma/media');
  }

  // get a single file's detail with all the thumbnails info available
  getSingleMedia(id: number): Observable<Pic> {
    return this.http.get<Pic>('http://media.mw.metropolia.fi/wbma/media/' + id);
  }
}
