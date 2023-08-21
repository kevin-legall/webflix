import axios from "axios";

export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";

interface SetSearchQueryAction {
    type: typeof SET_SEARCH_QUERY;
    payload: string;
}

export type ActionTypes = SetSearchQueryAction;

export const setSearchQuery = (searchQuery:string) => ({
    type: SET_SEARCH_QUERY,
    payload: searchQuery
});