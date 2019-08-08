//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private API_URL = 'https://us-central1-edirectinsure.cloudfunctions.net/app'

  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const data = {
        user:email,
        pass: password
      };

      this.http.post(this.API_URL + '/login', data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const data = {
        user: email,
        pass: password
      };

      this.http.post(this.API_URL + '/register', data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }

}
