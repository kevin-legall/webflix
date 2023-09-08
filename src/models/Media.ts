import { Genre } from "./Genre";

export class Media {

    private readonly _id: number;
    private _media_type:string;
    private _title: string;
    private _poster_path: string;
    private _genre_ids: number[];
    private _overview: string;
    private _vote_average: number;
    private _vote_count: number;
    private _genres: Genre[] = [];

    constructor(_id: number, _media_type:string, _title:string, _poster_path: string, _genre_ids: number[], _overview: string, _vote_average: number, _vote_count: number, _genres:Genre[]) {
        this._id = _id;
        this._media_type = _media_type;
        this._title = _title;
        this._poster_path = _poster_path;
        this._genre_ids = _genre_ids;
        this._overview = _overview;
        this._vote_average = _vote_average;
        this._vote_count = _vote_count;
        this._genres = _genres;
    }

    get id(): number {
        return this._id;
    }

    get media_type(): string {
        return this._media_type;
    }

    set media_type(value: string) {
        this._media_type = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get poster_path(): string {
        return this._poster_path;
    }

    set poster_path(value: string) {
        this._poster_path = value;
    }

    get genre_ids(): number[] {
        return this._genre_ids;
    }

    set genre_ids(value: number[]) {
        this._genre_ids = value;
    }

    get overview(): string {
        return this._overview;
    }

    set overview(value: string) {
        this._overview = value;
    }

    get vote_average(): number {
        return this._vote_average;
    }

    set vote_average(value: number) {
        this._vote_average = value;
    }

    get vote_count(): number {
        return this._vote_count;
    }

    set vote_count(value: number) {
        this._vote_count = value;
    }

    get genres(): Genre[] {
        return this._genres;
    }

    set genres(value: Genre[]) {
        this._genres = value;
    }

    public addGenre(genre: Genre) {
        this._genres.push(genre);
    }

    public removeGenre(genre: Genre) {
        const index = this._genres.findIndex((genre) => genre.id === genre.id);
        if (index !== -1) {
            this._genres.splice(index, 1);
        }
    }

}