import {
    ActionTypes,
    SET_SEARCH_QUERY
} from "../actions/movies.action";

const initialState = {};

export default function movieReducer(state = initialState, action:ActionTypes) {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            };
        default:
            return state;
    }
}