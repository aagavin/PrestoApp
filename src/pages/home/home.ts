import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Pro } from '@ionic/pro';
import { ServiceProvider } from '../../providers/service/service';
import { PrestoConstants } from "../../constants/prestoConstants";
import { to } from "../../util/to";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public prestoData: Array<any> = [];
  public accountCount: number = 0;

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
      Pro.monitoring.log('Home page', { level: 'info' })

  }


  public async ionViewDidLoad() {
    let accounts, err;
    const loader = this.loadingCtrl.create();
    loader.present();

    [err, accounts] = await to(this.storage.get(PrestoConstants.AccountDb));
    if (err || accounts == null) {
      console.error(err);
      loader.dismiss();
      Pro.monitoring.log(err, { level: 'error' });
    }
    else {
      this.accountCount = Object.keys(accounts).length;

      if (this.accountCount == 0) {
        loader.dismiss();
      }

      // TODO: reduce
      Object.keys(accounts).forEach((key, index, arr) => {
        this.service.getCookies(key, accounts[key]).subscribe(
          (data: Array<object>) => {
            this.prestoData.push({ 'username': key, 'cardData': data });
          },
          err => { console.error(err); loader.dismiss(), Pro.monitoring.log(err, { level: 'error' }) },
          () => { if (index + 1 === arr.length || arr.length === 0) loader.dismiss() }
        );
      });

    }

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
