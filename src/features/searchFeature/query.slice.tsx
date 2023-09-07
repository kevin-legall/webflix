import {createSlice} from "@reduxjs/toolkit";

interface QueryState {value: string}
const initialState: QueryState = {value: ""}

export const querySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
        getQuery: (state, {payload}) => {
            state.value = payload
        }
    }
});

export const {getQuery} = querySlice.actions;
export default querySlice.reducer;