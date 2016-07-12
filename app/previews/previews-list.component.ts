/**
 * Created by natete on 10/7/16.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {SearchbarService} from "../searchbar/searchbar.service";
import {SpotifyPreview} from "./preview.implementation";


@Component({
    templateUrl: 'app/previews/previews-list.component.html',
    providers: [
        SearchbarService
    ],
    styleUrls: ['app/previews/previews-list.component.css']
})
export class PreviewsListComponent implements OnInit, OnDestroy {
    private _sub: any;
    private _query: string;
    private _type: string;

    previews: SpotifyPreview[];
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
                this._searchbarService.getPreviews(this._query, this._type)
                    .subscribe(
                        previews => this.previews = previews,
                        error => this.errorMessage = <any>error
                    );
            });
            
            //     this..getHeroes()
            //         .then(heroes => this.heroes = heroes);
            // });
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    play(preview: SpotifyPreview) {
        if (this._isPlaying) {
            this._audio.pause();
            this._audio = undefined;
            this.previews.forEach((preview: SpotifyPreview) => preview.isPlaying = false);
        }
        this._audio = new Audio();
        this._audio.src = preview.preview;
        this._audio.load();
        this._audio.play();
        preview.isPlaying = true;
        this._isPlaying = true;
    }
    
    stop(preview: SpotifyPreview) {
        if(this._audio !== undefined) {
            this._audio.pause();
            this._audio = undefined;
        }
        this._isPlaying = false;
        preview.isPlaying = false;
    }
}