import 'reflect-metadata';
import { container } from 'tsyringe';
import { TOKENS } from '../../shared/src/constants';
import { IUiService } from '../../shared/src/contracts/ui.service';
import { App } from './app';
import { UiService } from './services/binance-ui.service';

container.register<IUiService>(TOKENS.UI_SERVICE, { useClass: UiService });

const app = container.resolve(App);

// TODO: app.on('ready')
setTimeout(() => {
  app.start().catch(console.error);
}, 1000);
