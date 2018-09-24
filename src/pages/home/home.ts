import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ServiceProvider } from '../../providers/service/service';
import { PrestoConstants } from "../../constants/prestoConstants";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public prestoData: Array<any> = [];

  /**
   * Creates an instance of HomePage.
   * @param {NavController} navCtrl 
   * @param {ServiceProvider} service 
   * @param {Storage} storage 
   * @memberof HomePage
   */
  constructor(
    public navCtrl: NavController,
    private service: ServiceProvider,
    private storage: Storage,
    private loadingCtrl: LoadingController) {


    const loader = this.loadingCtrl.create();
    loader.present();

    // TODO: reduce 
    this.storage.get(PrestoConstants.AccountDb).then(value => {
      // for (const key in value) {
      Object.keys(value).forEach(key => {

        this.service.getCookies(key, value[key]).subscribe((data: Array<object>) => {
          this.prestoData.push({ 'username': key, 'cardData': data });
        });

      });
      loader.dismiss();
    });
  }

  /**
   * Go to details page
   * 
   * @param {{}[]} usertable 
   * @memberof HomePage
   */
  public clickHandler(usertable: {}[]) {
    this.navCtrl.push('DetailsPage', { userData: usertable });
  }

  /**
   * addNewAccount
   */
  public addNewAccount() {
    this.navCtrl.push('AddPage');
  }

}
