import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CacheService } from "ionic-cache";
import { SettingsManagerProvider } from "../settings-manager/settings-manager";


@Injectable()
export class ServiceProvider {

  private static readonly baseUrl = "https://l8ck7zpfi0.execute-api.us-east-1.amazonaws.com/presto";

  constructor(
    public http: HttpClient,
    private settingsManagerProvider: SettingsManagerProvider,
    private cache: CacheService
  ) {
    cache.setDefaultTTL(300);
    console.log('Hello ServiceProvider Provider');
  }

  public getBalance(username: string, password: string): Observable<object> {

    // TODO: Add mock response
    // if (this.settingsManagerProvider.mock) {
    //   const headers = new HttpHeaders()
    //     .set('mock', 'true')
    //     .set('username', username)
    //     .set('password', password);
    //   return this.http.get(url, { headers: headers });
    // }
    // else {
    //   const headers = new HttpHeaders()
    //     .set('mock', 'false')
    //     .set('username', username)
    //     .set('password', password);
    //   return this.http.get(url, { headers: headers });
    // }

    let request = this.http.post(ServiceProvider.baseUrl, {
      'username': username,
      'password': password
    });

    return this.cache.loadFromObservable(ServiceProvider.baseUrl, request);
  }

}
