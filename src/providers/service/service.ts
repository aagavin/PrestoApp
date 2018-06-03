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

    let body = {
      'username': username,
      'password': password
    }

    if (this.settingsManagerProvider.mock) {
      body['mock'] = true;
    }

    const request = this.http.post(ServiceProvider.baseUrl, body);

    return this.cache.loadFromObservable(username, request);
  }

}
