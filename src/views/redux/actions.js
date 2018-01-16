export const SUBSCRIBE_REQUEST = "SUBSCRIBE_REQUEST";
export const SUBSCRIBE_SUCCESS = "SUBSCRIBE_SUCCESS";
export const SUBSCRIBE_FAILURE = "SUBSCRIBE_FAILURE";

export const UNSUBSCRIBE_REQUEST = "UNSUBSCRIBE_REQUEST";
export const UNSUBSCRIBE_SUCCESS = "UNSUBSCRIBE_SUCCESS";
export const UNSUBSCRIBE_FAILURE = "UNSUBSCRIBE_FAILURE";

export const GET_MESSAGES = "GET_MESSAGES";
export const GET_SUBSCRIPTIONS = "GET_SUBSCRIPTIONS";

export const SNS_ON = "SNS_ON";
export const SNS_OFF = "SNS_OFF";
export const SNS = "SNS";

export const getSns = () => (dispatch) => {
    return fetch(`/sns/status`, { method: "GET" }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
            return res.json().then((data) => {
                return dispatch({
                    type: SNS, data
                });
            });
        }
    });

}

export const switchSns = (status) => (dispatch) => {
    let type = SNS_ON;
    if (status !== "on") {
        type = SNS_OFF;
        status = "off";
    }

    return fetch(`/sns/status/${status}`, { method: "POST" }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
            return res.json().then((data) => {
                return dispatch({ type, data });
            });
        }
    });
}

export const fetchMessages = () => (dispatch) => {
    return fetch(`/sns/messages`, { method: "GET" }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
            return res.json().then((data) => {
                return dispatch({
                    type: GET_MESSAGES, data
                });
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
    dispatch({ type: SUBSCRIBE_REQUEST });
    return fetch(`/sns/subscribe/${topic}`, { method: "POST" }).then((res) => {
        return res.json().then((data) => {
            if (res.status >= 200 && res.status < 300) {
                dispatch({
                    type: SUBSCRIBE_SUCCESS, data
                });
            } else {
                dispatch({
                    type: SUBSCRIBE_FAILURE, error: data
                });
            }
        });
    });
}

export const unsubscribe = (subscriptionArn) => (dispatch) => {
    dispatch({
        type: UNSUBSCRIBE_REQUEST, subscriptionArn
    });
    return fetch(`/sns/unsubscribe/${subscriptionArn}`, { method: "POST" }).then((res) => {
        return res.json().then((data) => {
            if (res.status >= 200 && res.status < 300) {
                dispatch({
                    type: UNSUBSCRIBE_SUCCESS, subscriptionArn, data
                });
            } else {
                dispatch({
                    type: UNSUBSCRIBE_FAILURE, subscriptionArn, error: data
                });
            }
        });
    });
}