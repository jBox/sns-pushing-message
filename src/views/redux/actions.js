export const SUBSCRIBE = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";

export const GET_MESSAGES = "GET_MESSAGES";
export const GET_SUBSCRIPTIONS = "GET_SUBSCRIPTIONS";

export const fetchMessages = () => (dispatch) => {
    return fetch(`/sns/messages`, { method: "GET" }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
            return dispatch({
                type: GET_MESSAGES,
            });
        }
    });
}

export const fetchSubscriptions = () => (dispatch) => {
    return fetch(`/sns/subscriptions`, { method: "GET" }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
            return res.json().then((data) => {
                return dispatch({
                    type: GET_SUBSCRIPTIONS, data
                });
            });
        }
    });
}

export const subscribe = (topic) => (dispatch) => {
    return fetch(`/sns/subscribe/${topic}`, { method: "POST" }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
            return res.json().then((data) => {
                return dispatch({
                    type: SUBSCRIBE, data
                });
            });
        }
    });
}

export const unsubscribe = (subscriptionArn) => (dispatch) => {
    return fetch(`/sns/unsubscribe/${subscriptionArn}`, { method: "POST" }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
            return res.json().then((data) => {
                return dispatch({
                    type: UNSUBSCRIBE, data
                });
            });
        }
    });
}