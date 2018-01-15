import React, { Component } from "react";
import PropTypes from "prop-types";

const Subscription = ({ SubscriptionArn, onRemove }) => {
    return (
        <ul className="item-box">
            <li className="icon check">
                <i className="fa fa-check-circle-o" aria-hidden="true"></i>
            </li>
            <li className="input text">
                {SubscriptionArn}
            </li>
            <li className="remove">
                <i className="fa fa-minus-circle" aria-hidden="true" onClick={onRemove}></i>
            </li>
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