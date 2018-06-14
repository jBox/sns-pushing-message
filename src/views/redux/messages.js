import { combineReducers } from "redux";
import {
    GET_MESSAGES,
} from "./actions";

const data = (state = [], action) => {
    switch (action.type) {
        case GET_MESSAGES:
            return action.data;
        default:
            return state;
    }
}

const totalCount = (state = 0, action) => {
    switch (action.type) {
        case GET_MESSAGES:
            return action.totalCount;
        default:
            return state;
    }
}

export default combineReducers({
    data,
    totalCount
});
