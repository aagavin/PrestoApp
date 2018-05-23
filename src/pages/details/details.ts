import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  public userTable: UserTable = {balance: {balance: '', userTable: []}};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userTable = navParams.get('userData');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}


interface Balance {
  balance: string;
  userTable: string[][];
}

interface UserTable {
  balance: Balance;
}