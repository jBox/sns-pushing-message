import fs from "fs-extra";
import Path from "path";
import { subscribe } from "../../lib/sns/subscribe";

const SubscriptionsPath = Path.resolve(__dirname, "../../data/subscriptions");
const universe = global;
const initSubscriptions = () => {
    universe.__subscriptions = [];
    return fs.readJSON(SubscriptionsPath)
        .then((data) => {
            universe.__subscriptions = data;
            return universe.__subscriptions;
        }).catch((error) => {
            console.error(error);
            return Promise.resolve(universe.__subscriptions);
        });
};

initSubscriptions();

const updateSubscriptions = (subscriptions) => {
    return fs.writeJson(SubscriptionsPath, subscriptions)
        .then(() => {
            universe.__subscriptions = subscriptions;
            return subscriptions;
        })
        .catch((error) => {
            console.error(error);
            return Promise.resolve(universe.__subscriptions);
        });
};

export const addSubscription = (subscription) => {
    const subscriptions = [...universe.__subscriptions, subscription];
    return updateSubscriptions(subscriptions);
};

export const removeSubscription = (subscription) => {
    const subscriptions = universe.__subscriptions.reduce((items, sub) => {
        if (sub !== subscription) {
            return items.concat(sub);
        }

        return items;
    }, []);
    return updateSubscriptions(subscriptions);
};

export const getSubscriptions = () => {
    return Promise.resolve(universe.__subscriptions);
};