import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Form from "../components/subscribe/Form";
import Subscriptions from "../components/subscribe/Subscriptions";
import { subscribe, unsubscribe, fetchSubscriptions } from "../redux/actions";

class Subscribe extends Component {
    static propTypes = {
        subscriptions: PropTypes.array,
        fetchSubscriptions: PropTypes.func,
        subscribe: PropTypes.func,
        unsubscribe: PropTypes.func
    }

    timeout = 0;

    componentDidMount() {
        this.querySubscriptions();
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    querySubscriptions = () => {
        const { fetchSubscriptions } = this.props;
        if (fetchSubscriptions) {
            fetchSubscriptions();
            this.timeout = setTimeout(this.querySubscriptions, 1500);
        }
    }

    handleSubscribe = (arn) => {
        const { subscribe } = this.props;
        if (subscribe) {
            subscribe(arn);
        }
    }

    handleUnsubscribe = (sub) => {
        const { unsubscribe } = this.props;
        if (unsubscribe) {
            unsubscribe(sub.SubscriptionArn);
        }
    }

    render() {
        const { subscriptions, unsubscribe } = this.props;
        return (
            <div className="subscribe">
                <Form onSubmit={this.handleSubscribe} />
                <Subscriptions data={subscriptions} onRemove={this.handleUnsubscribe} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        subscriptions: state.subscriptions
    };
};

export default connect(mapStateToProps, {
    subscribe, unsubscribe, fetchSubscriptions
})(Subscribe);