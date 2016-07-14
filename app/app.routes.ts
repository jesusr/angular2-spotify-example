/**
 * Created by natete on 10/7/16.
 */
import { provideRouter, RouterConfig } from '@angular/router';
import { LandingComponent } from "./landing/landing.component";
import {TracksComponent} from "./tracks/tracks.component";
import {ArtistsComponent} from "./artists/artists.component";


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
        component: TracksComponent
    },
    {
        path: 'artists',
        component: ArtistsComponent
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];