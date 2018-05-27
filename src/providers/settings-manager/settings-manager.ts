import { Injectable } from '@angular/core';
import { Settings } from '../../objects/settings';
import { Storage } from "@ionic/storage";
import { PrestoConstants } from '../../constants/prestoConstants';

@Injectable()
export class SettingsManagerProvider {

  private settings: Settings = {mock: true};

  constructor(private storage: Storage) {
    this.storage.get(PrestoConstants.SettingsKey).then(settings => {
      
      if (typeof settings !== 'undefined' && settings != null) {
        this.settings = settings;
      }
      else{
        this.storage.set(PrestoConstants.SettingsKey, this.settings);
      }
      
    });
  }

  public async saveSettings(settings: Settings) {
    this.settings = settings;
    await this.storage.set(PrestoConstants.SettingsKey, settings);
  }

  public async getSettings(): Promise<Settings> {
    return await this.storage.get(PrestoConstants.SettingsKey);
  }



  public get mock(): boolean {
    return this.settings.mock;
  }


}
