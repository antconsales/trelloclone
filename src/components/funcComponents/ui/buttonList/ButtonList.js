import React, { useState, useEffect } from 'react';
import './buttonList.css'
import PropTypes from 'prop-types'
import Button from '../button/Button';

const ButtonList = (props) => {

    const [state, setState] = useState(
        {
            isDeleted: false,
        }
    )






    const deteleList = (e) => {
        let isDeleted = true;
        let newObjDash = null;
        let objDash = JSON.parse(localStorage.getItem(props.keyStore))
        console.log('objDash', objDash);
        let objDashList = objDash.dashboard.list


        let list = objDashList.filter((item) => item.listTitle !== props.label)

        let dashboard = objDash.dashboard

        newObjDash = { dashboard: { ...dashboard, list: list } }


        localStorage.removeItem(props.keyStore)
        console.log('newObjDash', newObjDash);
        localStorage.setItem(props.keyStore, JSON.stringify(newObjDash))




        setState({
            ...state,
            isDeleted
        })

    }

    return (

        <>
            {
                state.isDeleted === false &&
                <div
                    className={'button-dash-default' + ' ' + props.className}
                    style={{
                        backgroundColor: props.backgroundColor
                    }}
                >
                    <Button
                        className="button-close"
                        label="X"
                        onClickCallback={deteleList} />
                    {props.label}
                </div>
            }
        </>

    );
}

ButtonList.defaultProps = {
    label: 'Press'
}

ButtonList.propTypes = {
    label: PropTypes.string.isRequired
}

export default ButtonList;

