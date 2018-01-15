export const SUBSCRIBE = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";

export const GET_MESSAGES = "GET_MESSAGES";

export const fetchMessages = () => (dispatch) => {
    return fatch(`/sns/messages`, { method: "GET" }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
            return dispatch({
                type: GET_MESSAGES,
            });
        }
    });
}

export const subscribe = (topic) => (dispatch) => {
    return fatch(`/sns/subscribe/${topic}`, { method: "POST" }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
            return dispatch({
                type: SUBSCRIBE,
                topic
            });
        }
    });
}

export const unsubscribe = (sub) => (dispatch) => {
    return fatch(`/sns/unsubscribe/${sub}`, { method: "POST" }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
            return dispatch({
                type: UNSUBSCRIBE,
                sub
            });
        }
    });
}