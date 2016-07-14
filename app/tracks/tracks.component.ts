/**
 * Created by natete on 13/7/16.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {TracksListComponent} from "./tracks-list.component";
import {SearchbarService} from "../searchbar/searchbar.service";
import {Router} from "@angular/router";
import {Track} from "./track";

@Component({
    template: `
        <ows-tracks [tracks]="tracks"></ows-tracks>
    `,
    directives: [
        TracksListComponent
    ],
    providers: [
        SearchbarService
    ]
})
export class TracksComponent implements OnInit, OnDestroy {
    private _sub: any;
    private _query: string;

    tracks: Track[];
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
                this._searchbarService.findTracks(this._query)
                    .subscribe(
                        tracks => this.tracks = tracks,
                        error => this.errorMessage = <any>error
                    );
            });
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }
}