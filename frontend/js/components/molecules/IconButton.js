import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from './../atoms/Icon';

class IconButton extends Component {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                className="icon-button">
                {
                    this.props.icon &&
                    <Icon class="big padded">{this.props.icon}</Icon>
                }
                { this.props.children }
            </button>
        );
    }
}

IconButton.propTypes = {
    icon: PropTypes.string,
    onClick: PropTypes.func
};

export default IconButton;
