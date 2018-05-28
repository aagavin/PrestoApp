import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PrestoConstants } from '../../constants/prestoConstants';
import { SettingsManagerProvider } from "../settings-manager/settings-manager";


@Injectable()
export class ServiceProvider {

  private readonly baseUrl = "https://prestocrapper.herokuapp.com";

  constructor(public http: HttpClient, private settingsManagerProvider: SettingsManagerProvider) {
    console.log('Hello ServiceProvider Provider');
  }

  public getBalance(username: string, password: string): Observable<object> {

    const url = `${this.baseUrl}/presto/balance`;


    if (this.settingsManagerProvider.mock) {
      const headers = new HttpHeaders()
        .set('mock', 'true')
        .set('username', username)
        .set('password', password);
      return this.http.get(url, { headers: headers });
    }
    else {
      const headers = new HttpHeaders()
        .set('mock', 'false')
        .set('username', username)
        .set('password', password);
      return this.http.get(url, { headers: headers });
    }
  }

}
