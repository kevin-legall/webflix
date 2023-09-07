import {createSlice} from "@reduxjs/toolkit";

interface VoteState {value: boolean}
const initialState: VoteState = {value: true}

export const voteSlice = createSlice({
    name: "vote",
    initialState,
    reducers: {
        getVote: (state, {payload}) => {
            state.value = payload
        }
    }
});

export const {getVote} = voteSlice.actions;
export default voteSlice.reducer;