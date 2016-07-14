/**
 * Created by natete on 10/7/16.
 */
import { Component, Input } from '@angular/core';
import {Track} from "./track";


@Component({
    selector: 'ows-tracks',
    templateUrl: 'app/tracks/tracks-list.component.html',
    styleUrls: ['app/tracks/tracks-list.component.css']
})
export class TracksListComponent {

    private _isPlaying: boolean;
    private _audio: any;
    @Input() tracks: Track[];
    
    constructor(){}

    play(track: Track) {
        if (this._isPlaying) {
            this._audio.pause();
            this._audio = undefined;
            this.tracks.forEach((preview: Track) => preview.isPlaying = false);
        }
        this._audio = new Audio();
        this._audio.src = track.preview;
        this._audio.load();
        this._audio.play();
        track.isPlaying = true;
        this._isPlaying = true;
    }
    
    stop(track: Track) {
        if(this._audio !== undefined) {
            this._audio.pause();
            this._audio = undefined;
        }
        this._isPlaying = false;
        track.isPlaying = false;
    }
}