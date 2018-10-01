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

  }


  public async ionViewDidLoad() {
    const loader = this.loadingCtrl.create();
    // TODO: reduce 
    this.storage.get(PrestoConstants.AccountDb).then(value => {
      if (value != null) {
        loader.present();
        Object.keys(value).forEach((key, index, arr) => {
          this.service.getCookies(key, value[key]).subscribe(
            (data: Array<object>) => {
              this.prestoData.push({ 'username': key, 'cardData': data });
            },
            (err) => {console.error(err); loader.dismiss()},
            () => {if (index+1 === arr.length || arr.length === 0) loader.dismiss() }
          );
        });
      }
    });
  }

  /**
   * Go to details page
   * 
   * @param {{}[]} usertable 
   * @memberof HomePage
   */
  public clickHandler(usertable: {}[], username: string) {
    this.navCtrl.push('DetailsPage', { userData: usertable, username: username });
  }

  /**
   * addNewAccount
   */
  public addNewAccount() {
    this.navCtrl.push('AddPage');
  }

}
