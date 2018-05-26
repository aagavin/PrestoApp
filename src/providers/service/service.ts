import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from "@ionic/storage";
import { PrestoConstants } from '../../constants/prestoConstants';


@Injectable()
export class ServiceProvider {

  private readonly baseUrl = "https://prestocrapper.herokuapp.com";

  constructor(public http: HttpClient, public storage:Storage) {
    console.log('Hello ServiceProvider Provider');
  }

  public getBalance(username: string, password: string): Observable<object> {
    let headers = new HttpHeaders()
      .set('username', username)
      .set('password', password);
      // .set('mock', 'true');

    return this.http.get(`${this.baseUrl}/presto/balance`, {headers});
  }

}
