/**
 * Created by natete on 10/7/16.
 */
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { SearchBarComponent } from "./searchbar/searchbar.component";
import {MDL} from "./shared/MaterialDesignLiteUpgradeElement";

@Component({
    selector: 'ows-app',
    templateUrl: 'app/app.component.html',
    styleUrls: [
        'app/app.component.css'
    ],
    directives: [
        ROUTER_DIRECTIVES,
        SearchBarComponent,
        MDL
    ],
    precompile: [
    ]
})
export class AppComponent  {
    pageTitle: string = 'Angular 2 Spotify Example';

}