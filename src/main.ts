import {bootstrapApplication} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app/app-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './app/security/jwtIterceptor';

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(
            withInterceptors([JwtInterceptor])
        ),
        importProvidersFrom(BrowserAnimationsModule),
        provideRouter(routes,
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled'
            })
        ),
    ]
})
.catch(error => console.error(error));
