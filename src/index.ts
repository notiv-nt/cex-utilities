import 'reflect-metadata';
import { container } from 'tsyringe';
import { App } from './app';

const app = container.resolve(App);

// TODO: app.on('ready')
setTimeout(() => app.start(), 1000);
