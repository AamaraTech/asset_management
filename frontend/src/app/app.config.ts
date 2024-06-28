import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withDebugTracing,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { routes } from './app.routes';

import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPermissionsModule } from 'ngx-permissions';
import { environment } from 'src/environments/environment';
import { API_URL } from './core/api-url.token';
import { jwtInterceptor } from './core/shared/common/jwt.interceptor';

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideRouter(
      routes,
      // withEnabledBlockingInitialNavigation(),
      withComponentInputBinding(),
      // withDebugTracing()
    ),
    MessageService,
    ConfirmationService,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }).providers!,
    NgxPermissionsModule.forRoot().providers,
    { provide: API_URL, useValue: environment.BASE_SERVICE_URL },
  ],
};
