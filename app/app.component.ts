/**
 * Created by natete on 10/7/16.
 */
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {LandingComponent} from "./landing/landing.component";
import {TracksComponent} from "./tracks/tracks.component";
import {ArtistsComponent} from "./artists/artists.component";

@Component({
    selector: 'ows-app',
    template: `
        <ows-header></ows-header>
        <router-outlet></router-outlet>
    `,
    styles: [
      `
        ows-header {
           height:250px;
           width: 100%;
           display: block;
        }
      `
    ],


    directives: [
        ROUTER_DIRECTIVES,
        HeaderComponent
    ],
    precompile: [
        TracksComponent,
        LandingComponent,
        ArtistsComponent
    ]
})
export class AppComponent  {
    pageTitle: string = 'Angular 2 Spotify Example';

}