/**
 * Created by natete on 10/7/16.
 */
import { provideRouter, RouterConfig } from '@angular/router';
import { TracksListComponent } from "./tracks/tracks-list.component";
import { LandingComponent } from "./landing/landing.component";


export const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/landing',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        component: LandingComponent
    },
    {
        path: 'tracks',
        component: TracksListComponent
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];