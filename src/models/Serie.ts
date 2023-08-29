import { Genre } from "./Genre";
import { Media } from "./Media";

export class Serie extends Media {

    constructor(id: number, original_name: string, poster_path: string, genre_ids: number[], overview: string, vote_average: number, vote_count: number, genres:Genre[]) {
        super(id, original_name, poster_path, genre_ids, overview, vote_average, vote_count, genres);
    }
}