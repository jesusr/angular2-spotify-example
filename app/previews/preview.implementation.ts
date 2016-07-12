/**
 * Created by natete on 11/7/16.
 */

export class SpotifyPreview {
    title: string;
    album: string;
    artists: string;
    cover: string;
    preview: string;
    popularity: number;
    isPlaying: boolean;

    constructor(title: string, album: string, artists: string, cover: string, preview: string, popularity: number) {
        this.title = title;
        this.album = album;
        this.artists = artists;
        this.cover = cover;
        this.preview = preview;
        this.popularity = popularity;
        this.isPlaying = false;
    }

    static getSpotifyPreviewFromSpotifyResponse(spotifyResponse: any) {
        let title = spotifyResponse.name;
        let album = spotifyResponse.album.name;
        let artists = spotifyResponse.artists.map((artist: any) => artist.name).join(', ');
        let cover = spotifyResponse.album.images[0].url;
        let preview = spotifyResponse.preview_url;
        let popularity = spotifyResponse.popularity;

        return new SpotifyPreview(title, album, artists, cover, preview, popularity);
    }
}