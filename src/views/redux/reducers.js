import { combineReducers } from "redux";
import {
    SUBSCRIBE,
    GET_SUBSCRIPTIONS
} from "./actions";

const subscriptions = (state = [], action) => {
    switch (action.type) {
        case SUBSCRIBE:
        case GET_SUBSCRIPTIONS:
            return action.data;
        default:
            return state;
    }
}

const messages = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default combineReducers({
    subscriptions,
    messages
});
