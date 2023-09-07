import {createSlice} from "@reduxjs/toolkit";

interface GenresState {value: string}
const initialState: GenresState = {value: ""}

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