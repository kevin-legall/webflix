import {configureStore} from "@reduxjs/toolkit";
import queryReducer from "../features/movie.slice";

export const store = configureStore({
    reducer: {
        query:queryReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch