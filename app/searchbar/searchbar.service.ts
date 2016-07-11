/**
 * Created by natete on 11/7/16.
 */
import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {SpotifyPreview} from "../previews/preview.implementation";

@Injectable()
export class SearchbarService {
    private _BASE_URL: string = 'https://api.spotify.com/v1/search';

    constructor(private _http: Http) {}

    getPreviews(q: string, type: string): Observable<SpotifyPreview[]> {
        let params = new URLSearchParams();
        params.set('q', q);
        params.set('type', type);

        return this._http
            .get(this._BASE_URL, { search: params })
            .map((response: Response) => this.getSpotifyPreviews(response.json()))
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

    private getSpotifyPreviews(responseObject: any): SpotifyPreview[] {
        return responseObject.tracks.items.map((item: any) => SpotifyPreview.getSpotifyPreviewFromSpotifyResponse(item));
    }
}

/*
 *
 getProducts(): Observable<IProduct[]> {
 return this._http
 .get(this._productsUrl)
 .map((response: Response) => <IProduct[]>response.json())
 //.do(data => console.info('All ' + JSON.stringify(data)))
 .catch(this.handleError);
 }

 getProduct(id: number): Observable<IProduct> {
 let params = new URLSearchParams();
 params.set('productId', id.toString());

 return this._http
 .get(this._productsUrl, {search: params})
 .map((response: Response) => <IProduct>response.json()[0])
 .catch(this.handleError);
 }

 private handleError (error: any) {
 // In a real world app, we might use a remote logging infrastructure
 // We'd also dig deeper into the error to get a better message
 let errMsg = (error.message) ? error.message :
 error.status ? `${error.status} - ${error.statusText}` : 'Server error';
 console.error(errMsg); // log to console instead
 return Observable.throw(errMsg);
 }
 * */