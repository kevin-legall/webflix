import {combineReducers} from "redux";
import movieReducer from "./movie.reducer";

export const rootReducer = combineReducers({
    movieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;