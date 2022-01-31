import React, { useState, useEffect } from 'react';
import './buttonDash.css'
import PropTypes from 'prop-types'
import Button from '../button/Button';

const ButtonDash = (props) => {

    const [state, setState] = useState(
        {
            isDeleted: false,
        }
    )


    const onClick = (e) => {
        props.onClickCallback(e)
    }




    const deteleItem = () => {
        let isDeleted = true;
        localStorage.removeItem(props.label)

        setState({
            ...state,
            isDeleted
        })

    }

    return (

        <>
            {
                state.isDeleted === false &&
                <>
                    <div
                        className={'button-dash-default' + ' ' + props.className}
                        style={{
                            backgroundColor: props.backgroundColor
                        }}
                        onClick={onClick}
                    >

                        {props.label}
                    </div>
                    <Button
                        className="button-close"
                        label="X"
                        onClickCallback={deteleItem} />
                </>
            }
        </>

    );
}

ButtonDash.defaultProps = {
    label: 'Press'
}

ButtonDash.propTypes = {
    label: PropTypes.string.isRequired
}

export default ButtonDash;

