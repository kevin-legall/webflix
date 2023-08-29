import { Genre } from "./Genre";
import { Media } from "./Media";

export class Serie extends Media {

    private _original_name:string;

    constructor(id: number, media_type:string, original_name: string, poster_path: string, genre_ids: number[], overview: string, vote_average: number, vote_count: number, genres:Genre[]) {
        super(id, media_type, original_name, poster_path, genre_ids, overview, vote_average, vote_count, genres);
        this._original_name = original_name;
    }

    get original_name(): string {
        return this._original_name;
    }

    set original_name(value: string) {
        this._original_name = value;
    }
}