import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsPage } from './settings';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(SettingsPage),
  ],
})
export class SettingsPageModule {}
