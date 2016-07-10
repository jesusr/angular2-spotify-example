/**
 * Created by natete on 10/7/16.
 */
import { provideRouter, RouterConfig } from '@angular/router';
import {PreviewsListComponent} from "./previews/previews-list.component";


export const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/previews',
        pathMatch: 'full'
    },
    {
        path: 'previews',
        component: PreviewsListComponent
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];