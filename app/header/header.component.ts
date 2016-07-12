/**
 * Created by natete on 10/7/16.
 */
import { Component } from '@angular/core';
import {SearchBarComponent} from "../searchbar/searchbar.component";
import {MDL} from "../shared/MaterialDesignLiteUpgradeElement";

@Component({
    selector: 'ows-header',
    templateUrl: 'app/header/header.component.html',
    styleUrls: ['app/header/header.component.css'],
    directives: [
        SearchBarComponent,
        MDL
    ]
})
export class HeaderComponent  {
    pageTitle: string = 'Angular 2 Spotify Example';

}