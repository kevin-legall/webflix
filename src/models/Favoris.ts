import {Media} from "./Media";

export class Favoris {
    private static instance:Favoris;
    private readonly _id:number;
    private _list_medias:Media[] = [];

    constructor(id: number, list_favoris: Media[]) {
        this._id = id;
        this._list_medias = list_favoris;
    }

    public static getInstance(id: number, list_favoris: Media[]): Favoris {
        if (!Favoris.instance) {
            Favoris.instance = new Favoris(id, list_favoris);
        }
        return Favoris.instance;
    }

    get id(): number {
        return this._id;
    }

    get list_medias(): Media[] {
        return this._list_medias;
    }

    set list_medias(value: Media[]) {
        this._list_medias = value;
    }

    public addMedia(media:Media) {
        this.list_medias.push(media);
    }

    public removeMedia(media:Media) {
        const index = this.list_medias.findIndex((media) => media.id === media.id);
        if (index !== -1) {
            this.list_medias.splice(index, 1);
        }
    }
}