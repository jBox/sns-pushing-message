import AWS from "aws-sdk";
import {
    AWS_SNS_ACCESS_KEY,
    AWS_SNS_ACCESS_SECRET,
    AWS_SNS_REGION,
    AWS_SNS_HTTP_ENDPOINT
} from "../config";
import { addSubscription } from "./subscriptions";

const SNS = () => {
    AWS.config.update({
        accessKeyId: AWS_SNS_ACCESS_KEY,
        secretAccessKey: AWS_SNS_ACCESS_SECRET,
        region: AWS_SNS_REGION
    });

    return new AWS.SNS();
};

export const subscribe = (topic) => {
    const sns = SNS();
    const params = {
        Protocol: "http",
        TopicArn: topic,
        Endpoint: AWS_SNS_HTTP_ENDPOINT
    };
    return new Promise((resolve, reject) => {
        sns.subscribe(params, (err, data) => {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject(err);
            } else {
                console.log(data);   // successful response
                resolve(data);
            }
        });
    });
}

export const confirmSubscription = ({ Token, TopicArn }) => {
    const sns = SNS();
    return new Promise((resolve, reject) => {
        const params = { Token, TopicArn };
        sns.confirmSubscription(params, (err, data) => {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject(err);
            } else {
                console.log(data);           // successful response
                addSubscription(data.SubscriptionArn).then((data) => {
                    resolve(data);
                });
            }
        });
    });
};

export const unsubscribe = (subscriptionArn) => {
    const sns = SNS();
    const params = {
        SubscriptionArn: subscriptionArn
    };
    return new Promise((resolve, reject) => {
        sns.unsubscribe(params, (err, data) => {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject(err);
            } else {
                console.log(data);   // successful response
                resolve(data);
            }
        });
    });
}