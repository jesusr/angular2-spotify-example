/**
 * Created by natete on 11/7/16.
 */
import {Injectable} from '@angular/core';
import {Http, Jsonp, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Track } from "../tracks/track";
import {Artist} from "../artists/artist";

@Injectable()
export class SearchbarService {
    private _SPOTIFY_URL: string = 'https://api.spotify.com/v1/';
    private _WIKIPEDIA_URL: string = 'https://es.wikipedia.org/w/api.php';

    constructor(private _http: Http, private _jsonp: Jsonp) {}

    findTracks(q: string): Observable<Track[]> {
        let params = new URLSearchParams();
        params.set('q', q.replace(' ', '+'));
        params.set('type', 'track');

        return this._http
            .get(this._SPOTIFY_URL + 'search', { search: params })
            .map((response: Response) => this.getTracks(response.json().tracks.items))
            .catch(this.handleError);
    }

    findArtists(q: string) : Observable<Artist[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('q', q.replace(' ', '+'));
        params.set('type', 'artist');
        
        return this._http
            .get(this._SPOTIFY_URL + 'search', { search: params })
            .map((response: Response) => this.getArtists(response.json()))
            .catch(this.handleError);
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private getTracks(tracks: any[]): Track[] {
        return tracks
            .map((item: any) => Track.getTrackFromResponse(item));
    }

    //https://es.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=The%20Rolling%20Stones

    private getArtists(responseObject: any): Artist[] {
        var artists: Artist[];

        artists = responseObject.artists.items
            .map((item: any) => {
                var artist = Artist.getArtistFromResponse(item);

                Observable
                    .forkJoin(
                        this.getArtistBio(artist.name),
                        this.getArtistTopTracks(artist.id)
                    )
                    .subscribe((data: any) => this.completeArtist(artist, data));
                return artist;
            });

        return artists;
    }

    private getWikipediaParams(artistName: string): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams;
        params.set('format', 'json');
        params.set('action', 'query');
        params.set('prop', 'extracts');
        params.set('explaintext', '');
        params.set('titles', artistName.split(' ').join('+'));
        params.set('callback', 'JSONP_CALLBACK');

        return params;
    }

    private getArtistBio(artistName: string): Observable<string> {
        let params: URLSearchParams = this.getWikipediaParams(artistName);
        
        return this._jsonp
            .get(this._WIKIPEDIA_URL, { search: params })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private getArtistTopTracks(artistId: string): Observable<Track> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('country', 'ES');

        return this._http
            .get(this._SPOTIFY_URL + 'artists/' + artistId + '/top-tracks', { search: params })
            .map((response: Response) => this.getTracks(response.json().tracks))
            .catch(this.handleError);
    }

    private completeArtist(artist: Artist, data: any): void {
        let pages = data[0].query.pages;
        artist.bio = pages[Object.keys(pages)[0]].extract;
        artist.topTracks = data[1];
    }
}
