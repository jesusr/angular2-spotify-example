/**
 * Created by natete on 10/7/16.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {SearchbarService} from "../searchbar/searchbar.service";
import {Track} from "./track";


@Component({
    templateUrl: 'app/tracks/tracks-list.component.html',
    providers: [
        SearchbarService
    ],
    styleUrls: ['app/tracks/tracks-list.component.css']
})
export class TracksListComponent implements OnInit, OnDestroy {
    private _sub: any;
    private _query: string;
    private _type: string;

    tracks: Track[];
    errorMessage: string;
    private _isPlaying: boolean;
    private _audio: any;
    
    constructor(
        private _router: Router,
        private _searchbarService: SearchbarService
    ){}

    ngOnInit() {
        this._sub = this._router
            .routerState
            .queryParams
            .subscribe(params => {
                this._query = params['q'];
                this._type = params['type'];
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

    play(preview: Track) {
        if (this._isPlaying) {
            this._audio.pause();
            this._audio = undefined;
            this.tracks.forEach((preview: Track) => preview.isPlaying = false);
        }
        this._audio = new Audio();
        this._audio.src = preview.preview;
        this._audio.load();
        this._audio.play();
        preview.isPlaying = true;
        this._isPlaying = true;
    }
    
    stop(preview: Track) {
        if(this._audio !== undefined) {
            this._audio.pause();
            this._audio = undefined;
        }
        this._isPlaying = false;
        preview.isPlaying = false;
    }
}