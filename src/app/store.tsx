import {configureStore} from "@reduxjs/toolkit";
import queryReducer from "../features/searchFeature/query.slice";
import voteReducer from "../features/searchFeature/vote.slice";
import genresReducer from "../features/displayFeature/genres.slice";
import genresIdReducer from "../features/searchFeature/genresId.slice";

export const store = configureStore({
    reducer: {
        genres:genresReducer,
        query:queryReducer,
        vote:voteReducer,
        genresId:genresIdReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch