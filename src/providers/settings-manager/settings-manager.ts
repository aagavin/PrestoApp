import { Injectable } from '@angular/core';
import { Settings } from '../../objects/settings';
import { Storage } from "@ionic/storage";
import { PrestoConstants } from '../../constants/prestoConstants';

@Injectable()
export class SettingsManagerProvider {

  private settings: Settings = new Settings();

  constructor(private storage: Storage) {
    this.storage.get(PrestoConstants.SettingsKey).then(settings =>{
      this.settings = settings;
    });
  }

  public async saveSettings(settings: Settings){
    this.settings = settings;
    await this.storage.set(PrestoConstants.SettingsKey, settings);
  }

  public getSettings(): Settings{
    return this.settings;
  }
  

  
  public get mock() : boolean {
    return this.settings.mock;
  }
  

}
