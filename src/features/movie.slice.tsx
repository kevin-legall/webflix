import {createSlice} from "@reduxjs/toolkit";

interface QueryState {
    value: string
}

const initialState: QueryState = {
    value: ""
}

export const movieSlice = createSlice({
    name: "query",
    initialState,
    reducers: {
        getQuery: (state, {payload}) => {
            state.value = payload
        }
    }
});

export const {getQuery} = movieSlice.actions;
export default movieSlice.reducer;