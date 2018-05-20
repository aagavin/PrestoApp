import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PrestoConstants } from "../../constants/prestoConstants";


@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {

  public accounts = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
  }

  public async ionViewDidEnter(){
    this.accounts = await this.storage.get(PrestoConstants.AccountDb);
    console.log(this.accounts);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

}
