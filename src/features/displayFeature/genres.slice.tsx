import {createSlice} from "@reduxjs/toolkit";
import {Genre} from "../../models/Genre";

interface GenresState {value: Genre[]}
const initialState: GenresState = {value: []}

export const genresSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {
        getGenres: (state, {payload}) => {
            state.value = payload
        }
    }
});

export const {getGenres} = genresSlice.actions;
export default genresSlice.reducer;