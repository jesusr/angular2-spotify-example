/**
 * Created by natete on 13/7/16.
 */

import {Component, OnDestroy, OnInit} from "@angular/core";
import {SearchbarService} from "../searchbar/searchbar.service";
import {Router} from "@angular/router";
import {TracksListComponent} from "../tracks/tracks-list.component";
import {Artist} from "./artist";

@Component({
    templateUrl: 'app/artists/astists.component.html',
    directives: [
        TracksListComponent
    ],
    providers: [
        SearchbarService
    ],
    styleUrls: ['app/artists/artists.component.css']
})
export class ArtistsComponent implements OnInit, OnDestroy {
    private _sub: any;
    private _query: string;

    artists: Artist[];
    errorMessage: string;

    constructor(
        private _router: Router,
        private _searchbarService: SearchbarService
    ){}

    ngOnInit(): void {
        this._sub = this._router
            .routerState
            .queryParams
            .subscribe(params => {
                this._query = params['q'];
                this._searchbarService.findArtists(this._query)
                    .subscribe(
                        artists => this.artists = artists,
                        error => this.errorMessage = <any>error
                    );
            });
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }
}