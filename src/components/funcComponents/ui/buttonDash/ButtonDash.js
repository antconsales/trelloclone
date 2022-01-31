import React from 'react';
import './buttonDash.css'
import PropTypes from 'prop-types'
import Button from '../button/Button';

const ButtonDash = (props) => {

    const onClick = (e) => {
        props.onClickCallback(e)
    }

    return (
        <div
            className={'button-dash-default' + ' ' + props.className}
            style={{
                backgroundColor: props.backgroundColor
            }}
            onClick={onClick}
        >
        <Button/>
            {props.label}
        </div>
    );
}

ButtonDash.defaultProps = {
    label: 'Press'
}

ButtonDash.propTypes = {
    label: PropTypes.string.isRequired
}

export default ButtonDash;

