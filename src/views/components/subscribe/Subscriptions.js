import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Subscription = ({ SubscriptionArn, unsubscribe, error, onRemove }) => {
    const textClass = classNames("input text", { unsubscribe: unsubscribe === "pending" });
    const errorMessage = error && unsubscribe === "failure" ? error.message : "";
    return (
        <ul className="item-box">
            <li className="icon">
                <i className="fa fa-check-circle-o check" aria-hidden="true"></i>
                <i className="fa fa-minus-circle remove" aria-hidden="true" onClick={onRemove}></i>
            </li>
            <li className={textClass}>
                {SubscriptionArn}
            </li>
            {errorMessage && (
                <li className="error-message">
                    {errorMessage}
                </li>
            )}
        </ul>
    );
}

export default class Subscriptions extends Component {
    static propTypes = {
        data: PropTypes.array,
        onRemove: PropTypes.func
    }

    handleRemove = (item) => {
        const { onRemove } = this.props;
        return () => {
            if (onRemove) {
                onRemove(item);
            }
        }
    }

    render() {
        const { data } = this.props;

        return (
            <div className="subscriptions">
                <h3>Subscriptions</h3>
                {data.map((item, index) => (
                    <Subscription key={index} {...item} onRemove={this.handleRemove(item)} />
                ))}
            </div>
        );
    }
}