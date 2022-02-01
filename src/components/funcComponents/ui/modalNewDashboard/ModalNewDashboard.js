import React from 'react';
import './modalNewDashboard.css'
import PropTypes from 'prop-types'
import SelectColor from '../selectColor/SelectColor';
import InputBox from '../inputBox/InputBox';
import Button from '../button/Button';


// REDUX
import { connect } from 'react-redux';
import { setConfig } from '../../../../redux/ducks/configDuck';
import { setToken } from '../../../../redux/ducks/tokenDuck'

const ModalNewDashboard = (props) => {

    const inputTitleNewDash = (e) => {
        const title = e.target.value
        console.log(title);
        let obj = {
            title
        }
        props.dispatch(setConfig(obj))
    }


    return (
        <div className={props.className}>

            <SelectColor
                colorTitle={'Seleziona il tuo Sfondo'}
            />

            <h4>Inserisci Titolo</h4>

            <InputBox
                type='text'
                placeholder='inserisci titolo'
                onChangeCallback={inputTitleNewDash}

            />


        </div>
    );
}

ModalNewDashboard.defaultProps = {
    // label: 'Press'
}

ModalNewDashboard.propTypes = {
    // label: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    tokenDuck: state.tokenDuck,
    configDuck: state.configDuck
});

export default connect(mapStateToProps)(ModalNewDashboard);
