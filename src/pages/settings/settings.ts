import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PrestoConstants } from "../../constants/prestoConstants";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.myForm = new FormGroup({
      mock: new FormControl()
    });
  }

  public async ionViewDidLoad(){
    this.myForm.valueChanges.subscribe(async change => {
      await this.storage.set(PrestoConstants.SettingsKey, change);
    });
  }

}
