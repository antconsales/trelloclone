import React from 'react';
import './button.css'
import PropTypes from 'prop-types'

const Button = (props) => {

    const onClick = (e) => {
        props.onClickCallback(e)
    }

    return (
        <button
            className={props.className + ' ' + 'button-default'}
            style={{
                backgroundColor: props.backgroundColor
            }}
            onClick={onClick}
        >
            {props.label}
        </button>
    );
}

Button.defaultProps = {
    label: 'Press'
}

Button.propTypes = {
    label: PropTypes.string.isRequired
}

export default Button;

