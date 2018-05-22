import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PrestoConstants } from "../../constants/prestoConstants";


@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {

  public accounts = {};
  public keys = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController) { }

  private showAlert(title: string, subTitle: string, ) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  public async ionViewDidEnter() {
    this.accounts = await this.storage.get(PrestoConstants.AccountDb);
    this.keys = Object.keys(this.accounts);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

  /**
   * Clear the form
   * 
   * @param {number} index 
   * @memberof AccountsPage
   */
  public clearForm(index: number) {
    this.accounts[this.keys[index]] = "";
  }

  /**
   * Update account password
   * 
   * @param {number} index 
   * @returns 
   * @memberof AccountsPage
   */
  public async updateAccount(index: number) {
    const password = this.accounts[this.keys[index]];
    if (password === '') {
      console.log('the password is empty');
      this.showAlert('Password', 'password cant be empty');
      return;
    }

    await this.storage.set(PrestoConstants.AccountDb, this.accounts);
    this.showAlert('Saved', null);

  }

  /**
   * Delete account
   * 
   * @param {number} index 
   * @memberof AccountsPage
   */
  public async deleteAccount(index: number) {
    delete this.accounts[this.keys[index]];
    this.keys.splice(index, 1);
    await this.storage.set(PrestoConstants.AccountDb, this.accounts);
    this.showAlert('Account deleted', '');
  }

}
