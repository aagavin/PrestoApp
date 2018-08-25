import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CacheService } from "ionic-cache";
import { SettingsManagerProvider } from "../settings-manager/settings-manager";


@Injectable()
export class ServiceProvider {

  private static readonly BASEURL = "https://l8ck7zpfi0.execute-api.us-east-1.amazonaws.com/presto";

  constructor(
    public http: HttpClient,
    // private settingsManagerProvider: SettingsManagerProvider,
    private cache: CacheService
  ) {
    this.cache.setDefaultTTL(1200);
    this.cache.setOfflineInvalidate(false);
    console.log('Hello ServiceProvider Provider');
  }

  public getCookies(username: string, password: string): Observable<Array<object>> {

    const body = {
      'username': username,
      'password': password
    }

    const cookies_request = this.http.post(ServiceProvider.BASEURL+'/cookies', body);
    return this.cache.loadFromObservable(username+'cookies', cookies_request);
  }

  public getBalance(username: string, cookies: Array<object>): Observable<object>{
    console.log('cookies');
    console.log(cookies);

    const body = {
      "cookies": JSON.stringify(cookies)
    }

    const balance_request = this.http.post(ServiceProvider.BASEURL + '/balance', body);
    return this.cache.loadFromObservable(username+'balance', balance_request);
    
  }

}
