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
    let headers = new HttpHeaders()
      .set('username', username)
      .set('password', password)
      .set('mock', 'true');
    
    const mock = this.settingsManagerProvider.mock;

    if (mock) {
      headers.append('mock', 'true');
    }

    return this.http.get(`${this.baseUrl}/presto/balance`, {headers});


  }

}
