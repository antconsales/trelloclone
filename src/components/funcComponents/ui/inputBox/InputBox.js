import React from 'react';
import './inputBox.css'
import PropTypes from 'prop-types'

const InputBox = (props) => {

    const onChange = (e) => {
        props.onChangeCallback(e)
    }
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            onChange={onChange}
            className={props.className}
        >

        </input>
    );
}

InputBox.defaultProps = {
    // label: 'Press'
}

InputBox.propTypes = {
    // label: PropTypes.string.isRequired
}

export default InputBox;
