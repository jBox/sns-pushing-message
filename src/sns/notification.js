const notifications = [];

export const set = ({ Subject, Message, TopicArn }) => {
    notifications.push({
        Subject, Message, TopicArn, Timestamp: Date.now()
    });
};

export const get = (timestamp) => {
    if (!timestamp) {
        return notifications;
    }

    return notifications.filter(x => x.Timestamp >= timestamp);
};