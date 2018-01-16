import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchMessages } from "../redux/actions";

const Message = ({ topic, subject, message }) => {
    return (
        <div className="message">
            <p><label><span>Topic</span> {topic}</label></p>
            <p><label><span>Subject</span> {subject}</label></p>
            <p><label><span>Message</span> {message}</label></p>
        </div>
    );
}

class Output extends Component {

    static propTypes = {
        messages: PropTypes.array,
        fetchMessages: PropTypes.func
    }

    DELAY = 1000;
    timeout = 0;

    componentDidMount() {
        this.queryMessages();
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    queryMessages = () => {
        const { fetchMessages } = this.props;
        if (fetchMessages) {
            fetchMessages();
            this.timeout = setTimeout(this.queryMessages, this.DELAY);
        }
    }

    render() {
        const { messages } = this.props;
        const items = messages.reverse().slice(0, 10);
        return (
            <div className="output">
                <h3>Messages</h3>
                {items.map((item, index) => (
                    <Message key={index} subject={item.Subject} message={item.Message} topic={item.TopicArn} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    };
};

export default connect(mapStateToProps, {
    fetchMessages
})(Output);