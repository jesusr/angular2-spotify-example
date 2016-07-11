/**
 * Created by natete on 10/7/16.
 */
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {PreviewsListComponent} from "./previews/previews-list.component";
import {HeaderComponent} from "./header/header.component";

@Component({
    selector: 'ows-app',
    template: `
        <ows-header></ows-header>
        <router-outlet></router-outlet>
    `,
    directives: [
        ROUTER_DIRECTIVES,
        HeaderComponent
    ],
    precompile: [
        PreviewsListComponent
    ]
})
export class AppComponent  {
    pageTitle: string = 'Angular 2 Spotify Example';

}