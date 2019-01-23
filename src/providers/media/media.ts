import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pic } from '../../interface/pic';
import { User } from '../../interface/user';
import { ServerResponse } from '../../interface/response';
import { Storage } from '@ionic/storage';

// import { of } from 'rxjs/observable/of';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  //
  private endPoint = 'https://media.mw.metropolia.fi/wbma/';
  private autoattempt_log_in = false;
  loginStatus = false;
  //
  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello MediaProvider Provider');
  }
  // get all the media
  getAllMedia(): Observable<Pic[]> {
    return this.http.get<Pic[]>(this.endPoint + 'media');
  }

  // get a single file's detail with all the thumbnails info available
  getSingleMedia(id: number): Observable<Pic> {
    return this.http.get<Pic>(this.endPoint + 'media/' + id);
  }
  // send user logging in
  logUserIn(data: User): Observable<any> {
    console.log(this.endPoint + 'login/');
    console.log(data);
    return this.http.post<ServerResponse>(this.endPoint + 'login/', data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  // put token into storage for remembrance
  rememberToken(input: string) {
    this.storage.set('token', input)
      .then(res => {
        console.log(res);
        this.loginStatus = true;
      }, err => console.log(err));
  }
  // log user out
  logUserOut() {
    this.loginStatus = false;
    this.storage.get('token').then(result => {
      console.log(result);
      this.storage.set('token', '').then(ans => {
        console.log(ans);
        this.storage.set('current-user', '').catch(err => console.log(err));
      }, err => console.log(err));
    }, error => console.log(error));
  }
  // check auto log in attempt
  checkAuto(): boolean {
    return this.autoattempt_log_in;
  }
  // attempt to auto log user in
  autoLogin(token): Observable<any> {
    console.log('attempting auto logging in');
    this.autoattempt_log_in = true;
    return this.http.get(this.endPoint + 'users/user', {
        headers: { 'x-access-token': token }
      });
  }
  // set log in status
  setLogIn() {
    this.loginStatus = true;
  }
  // check user name existence
  checkUsername(input: string): Observable<any> {
    return this.http.get<any>(this.endPoint + 'users/username/' + input);
  }
  // register new user
  registerUser(data: User) {
    return this.http.post(this.endPoint + 'users', data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
