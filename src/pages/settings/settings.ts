import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PrestoConstants } from "../../constants/prestoConstants";
import { SettingsManagerProvider } from "../../providers/settings-manager/settings-manager";
import { Settings } from "../../objects/settings";
import { FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public settings: Settings = new Settings();
  public myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private settingsManagerProvider: SettingsManagerProvider) {
    this.myForm = new FormGroup({
      mock: new FormControl()
    });
  }

  public async ionViewDidLoad(){
    
    this.myForm.setValue(await this.settingsManagerProvider.getSettings());

    this.myForm.valueChanges.subscribe(async change => {
      await this.settingsManagerProvider.saveSettings(change);
    });
  }

}
