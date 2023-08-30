import { Genre } from "./Genre";
import { Media } from "./Media";

export class Serie extends Media {

    private _name:string;

    constructor(id: number, media_type:string, name: string, poster_path: string, genre_ids: number[], overview: string, vote_average: number, vote_count: number, genres:Genre[]) {
        super(id, media_type, name, poster_path, genre_ids, overview, vote_average, vote_count, genres);
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}