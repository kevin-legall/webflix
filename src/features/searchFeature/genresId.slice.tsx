import {createSlice} from "@reduxjs/toolkit";

interface GenresIdState {value: string}
const initialState: GenresIdState = {value: ""}

export const genresIdSlice = createSlice({
    name: "genresId",
    initialState,
    reducers: {
        getGenresId: (state, {payload}) => {
            state.value = payload
        }
    }
});

export const {getGenresId} = genresIdSlice.actions;
export default genresIdSlice.reducer;