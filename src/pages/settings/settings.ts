import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public settings: Settings;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.settings = new Settings();
  }

  public async ionViewDidLoad() {
    this.settings = await this.storage.get('settings');

    if (this.settings == null) {
      console.log('settings are null');
      this.settings = {
        'mock': true
      };
    }

  }

}


class Settings {
  mock: boolean;
}
