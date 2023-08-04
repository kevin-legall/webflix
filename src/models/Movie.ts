import { Genre } from "./Genre";

export class Movie {
    private _id: number;
    private _original_title: string;
    private _poster_path: string;
    private _genre_ids: number[];
    private _overview: string;
    private _vote_average: number;
    private _vote_count: number;
    private _genres: Genre[] = [];

    constructor(id: number, original_title: string, poster_path: string, genre_ids: number[], overview: string, vote_average: number, vote_count: number) {
        this._id = id;
        this._original_title = original_title;
        this._poster_path = poster_path;
        this._genre_ids = genre_ids;
        this._overview = overview;
        this._vote_average = vote_average;
        this._vote_count = vote_count;
    }


    get id(): number {
        return this._id;
    }

    get original_title(): string {
        return this._original_title;
    }

    set original_title(value: string) {
        this._original_title = value;
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