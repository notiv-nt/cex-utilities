import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { log } from '../lib/log';
import { IUserConfig } from '../types';
import { defaultConfig } from './default-config';

@singleton()
export class UserConfig extends BaseService {
  public config: IUserConfig;

  constructor() {
    super();
    this.listenForConfigChanges();
  }

  listenForConfigChanges() {
    chrome.storage.local.onChanged.addListener(async (e) => {
      log('Config changed', e);
      this.loadConfig();
    });
  }

  async loadConfig() {
    const storage = await chrome.storage.local.get();

    this.config = {
      ...defaultConfig,
      ...(storage.config || {}),
    };

    this.emit('change', this.config);

    log('Config loaded', this.config);

    return this.config;
  }
}
