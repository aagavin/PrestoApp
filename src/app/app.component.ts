import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CodePush, InstallMode } from '@ionic-native/code-push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private codePush: CodePush) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Accounts', component: 'AccountsPage' },
      { title: 'New Account', component: 'AddPage' },
      { title: 'Settings', component: 'SettingsPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      try {
        // this.codePush.sync().subscribe(syncStatus => console.log(syncStatus));
        this.checkCodePush()
      }
      catch (err) {
        console.log(err);
      }
    });
  }

  checkCodePush() {

    this.codePush.sync({
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: "\n\nChange log:\n"
      },
      installMode: InstallMode.IMMEDIATE
    }).subscribe(
      (data) => {
        console.log('CODE PUSH SUCCESSFUL: ' + data);

      },
      (err) => {
        console.log('CODE PUSH ERROR: ' + err);

      }
    );
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
