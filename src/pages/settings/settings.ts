import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PrestoConstants } from "../../constants/prestoConstants";
import { Settings } from "../../objects/settings";
import { Subject } from 'rxjs/Subject';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  
  // settingsForm
  @ViewChild('settingsForm') settingsForm;

  public settings: Settings = new Settings();

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

  }

  public async ionViewWillEnter() {
    const settings = await this.storage.get(PrestoConstants.SettingsKey);
    if (settings == null) {
      this.settings.mock = true;
      
    }
  }

}
