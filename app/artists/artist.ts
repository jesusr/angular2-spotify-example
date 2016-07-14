/**
 * Created by natete on 13/7/16.
 */

import {Injectable} from "@angular/core";
import {Track} from "../tracks/track";

@Injectable()
export class Artist {
    id: string;
    name: string;
    genres: string;
    image: string;
    bio: string;
    popularity: number;
    topTracks: Track[];


    constructor(id: string, name: string, genres: string, image: string, popularity: number, bio?: string) {
        this.id = id;
        this.name = name;
        this.genres = genres;
        this.image = image || 'http://fakeimg.pl/300/';
        this.popularity = popularity;
        this.bio = bio || 'Not available';
    }

    static getArtistFromResponse(response: any): Artist {
        let id: string = response.id;
        let name: string = response.name;
        let genres: string = response.genres.join(', ');
        let image: string = response.images.length > 1 ?
            response.images[1].url :
            response.images.length === 1 ? response.images[0].url : '';
        let popularity: number = response.popularity;

        return new Artist(id, name, genres, image, popularity);
    }
}