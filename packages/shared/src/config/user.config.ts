import { log } from '../lib';
import { singleton } from 'tsyringe';
import BaseService from '../base/base.service';
import { defaultConfig, type IUserConfig } from './default-config';

@singleton()
export class UserConfig extends BaseService {
  public config!: IUserConfig;

  constructor() {
    super();
    this.listenForConfigChanges();
  }

  private listenForConfigChanges() {
    chrome.storage.local.onChanged.addListener((e) => {
      log('Config changed', e);
      this.loadConfig();
    });
  }

  public async loadConfig() {
    const storage = await chrome.storage.local.get();

    this.config = {
      ...defaultConfig,
      ...(storage.config || {}),
    };

    this.emit('change', this.config);

    log('Config loaded', this.config);

    return this.config;
  }

  // for dev environment
  public clearConfig() {
    chrome.storage.local.clear();
  }
}
