import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {Media} from "../../models/Media";

export const getFavorites = createAsyncThunk("getFavorites", async (_, thunkAPI) => {
    axios
        .get("http://localhost:8000/api/media")
        .then((res) => thunkAPI.dispatch(getFavoritesSuccess(res.data)));
});

interface FavoritesState {value: Media[]}
const initialState: FavoritesState = {value: []}

export const favoritesSlice= createSlice({
    name: "favorites",
    initialState,
    reducers: {
        getFavoritesSuccess: (state, {payload}) => {
            state.value = payload;
        },
        addFavorite: (state, {payload}) => {
            state.value.push(payload);
        },
        removeFavorite: (state, {payload}) => {
            state.value = state.value.filter((favorite) => favorite.id !== payload);
        },
    },
});

export const {
    getFavoritesSuccess,
    addFavorite,
    removeFavorite,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
