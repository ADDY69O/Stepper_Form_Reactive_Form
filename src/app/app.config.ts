import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CommonComponent } from './common/common.component';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { NoopAnimationDriver } from '@angular/animations/browser';
import { NoopAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),CommonComponent, provideToastr({
    timeOut: 10000,
    positionClass: 'toast-top-left',
    preventDuplicates: true,
  }), provideAnimations(),provideHttpClient()]
};
