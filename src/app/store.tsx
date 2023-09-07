import {configureStore} from "@reduxjs/toolkit";
import queryReducer from "../features/searchFeature/query.slice";
import voteReducer from "../features/searchFeature/vote.slice";
import genresReducer from "../features/searchFeature/genres.slice";

export const store = configureStore({
    reducer: {
        query:queryReducer,
        vote:voteReducer,
        genres:genresReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch