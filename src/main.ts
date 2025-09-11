import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localeFa from '@angular/common/locales/fa';

registerLocaleData(localeFa);
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
