import {bootstrapApplication} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { RouterFeature, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app/app-routing.module';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { JwtInterceptor } from './app/security/jwtIterceptor';

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        importProvidersFrom(BrowserAnimationsModule),
        provideRouter(routes,
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled'
            })
        ),
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ]
})
.catch(error => console.error(error));
