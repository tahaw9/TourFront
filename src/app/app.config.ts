import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient} from '@angular/common/http';
import {httpWithCredentialsInterceptorProvider} from './interceptors/credentials.interceptor';

export const appConfig: ApplicationConfig = {

  providers: [
    provideAnimations(),
    provideHttpClient(),
    httpWithCredentialsInterceptorProvider,
    { provide: LOCALE_ID, useValue: 'fa' },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
