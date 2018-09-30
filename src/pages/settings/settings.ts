import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SettingsManagerProvider } from "../../providers/settings-manager/settings-manager";
import { Settings } from "../../objects/settings";
import { FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public settings: Settings = new Settings();
  public myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  public async ionViewDidLoad(){

  }

}
