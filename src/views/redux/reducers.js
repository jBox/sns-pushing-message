import { combineReducers } from "redux";

const subscriptions = (state = [
    {
        endpoint: "wallance.zhang@moodys.com",
        protocol: "email",
        subscriptionArn: "arn:aws:sns:ap-southeast-1:807141695677:CodingTestResults:99a4410f-ad04-4677-aa16-0c56a8918599",
        topicArn: "arn:aws:sns:ap-southeast-1:807141695677:CodingTestResults"
    },
    {
        endpoint: "http://18.218.154.49/sns",
        protocol: "http",
        subscriptionArn: "arn:aws:sns:ap-southeast-1:807141695677:CodingTestResults:f38dd511-5a4e-4ed6-b63f-cafce5459310",
        topicArn: "arn:aws:sns:ap-southeast-1:807141695677:CodingTestResults"
    }
], action) => {
    return state;
}

const messages = (state = [], action) => {
    return state;
}

export default combineReducers({
    subscriptions,
    messages
});
