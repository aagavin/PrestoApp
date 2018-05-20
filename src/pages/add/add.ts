import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  public username: string;
  public password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  public async addAccount(): Promise<any> {
    let accounts: object = await this.storage.get('accounts');

    if (accounts == null) { accounts = {}; }
    accounts[this.username] = this.password;

    try {
      await this.storage.set('accounts', accounts);
      this.alertCtrl.create({
        title: 'Added New Account',
        buttons: ['OK']
      }).present();      
    } catch (error) {
      this.alertCtrl.create({
        title: 'Error with adding new accounts',
        subTitle: error.getMessage(),
        buttons: ['OK']
      }).present(); 
    }


  }

}
