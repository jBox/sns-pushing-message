import AWS from "aws-sdk";
import {
    AWS_SNS_ACCESS_KEY,
    AWS_SNS_ACCESS_SECRET,
    AWS_SNS_REGION,
    AWS_SNS_HTTP_ENDPOINT
} from "../config";
import { addSubscription, removeSubscription } from "./subscriptions";
import request from "request-promise-native";
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
                return addSubscription({
                    Endpoint: AWS_SNS_HTTP_ENDPOINT,
                    TopicArn: topic,
                    SubscriptionArn: data.SubscriptionArn
                }).then((subscriptions) => resolve(subscriptions));
            }
        });
    });
}

export const confirmSubscription = ({ TopicArn, SubscribeURL }) => {
    return request.get(SubscribeURL).then((data) => {
        const [, SubscriptionArn] = Array.from(/<SubscriptionArn>(.*?)<\/SubscriptionArn>/ig.exec(data) || []);
        if (SubscriptionArn) {
            // successful response
            return addSubscription({
                Endpoint: AWS_SNS_HTTP_ENDPOINT,
                TopicArn,
                SubscriptionArn
            });
        } else {
            return console.log(data);
        }
    }).catch(error => console.error(error));
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
                return removeSubscription(subscriptionArn).then((subscriptions) => {
                    resolve(subscriptions);
                });
            }
        });
    });
}