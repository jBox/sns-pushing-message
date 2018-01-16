import { combineReducers } from "redux";
import {
    SUBSCRIBE_REQUEST,
    SUBSCRIBE_SUCCESS,
    SUBSCRIBE_FAILURE,
    UNSUBSCRIBE_REQUEST,
    UNSUBSCRIBE_SUCCESS,
    UNSUBSCRIBE_FAILURE,
    GET_SUBSCRIPTIONS,
    GET_MESSAGES
} from "./actions";

const subscribe = (state = {
    status: "ready",
    error: null
}, action) => {
    switch (action.type) {
        case SUBSCRIBE_REQUEST:
            return { status: "request", error: null }
        case SUBSCRIBE_SUCCESS:
            return { status: "ready", error: null }
        case SUBSCRIBE_FAILURE:
            return { status: "error", error: action.error }
        default:
            return state;
    }
}

const subscriptions = (state = [], action) => {
    switch (action.type) {
        case SUBSCRIBE_SUCCESS:
        case UNSUBSCRIBE_SUCCESS:
        case GET_SUBSCRIPTIONS:
            return action.data.map((item) => {
                const exists = state.find(x => x.SubscriptionArn === item.SubscriptionArn);
                if (exists) {
                    return exists;
                }

                return item;
            });
        case UNSUBSCRIBE_REQUEST:
            return state.map((item) => {
                if (item.SubscriptionArn === action.subscriptionArn) {
                    return { ...item, unsubscribe: "pending" }
                }

                return item;
            });
        case UNSUBSCRIBE_FAILURE:
            return state.map((item) => {
                if (item.SubscriptionArn === action.subscriptionArn) {
                    return { ...item, error: action.error, unsubscribe: "failure" }
                }

                return item;
            });
        default:
            return state;
    }
}

const messages = (state = [], action) => {
    switch (action.type) {
        case GET_MESSAGES:
            return action.data;
        default:
            return state;
    }
}

export default combineReducers({
    subscribe,
    subscriptions,
    messages
});
