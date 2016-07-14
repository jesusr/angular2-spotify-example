import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from "./app.routes";
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {HTTP_PROVIDERS, JSONP_PROVIDERS} from "@angular/http";


bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    JSONP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
]);
