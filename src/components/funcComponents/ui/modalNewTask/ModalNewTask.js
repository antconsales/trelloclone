import React, { useState, useEffect } from 'react';
import './modalNewTask.css'
import PropTypes from 'prop-types'
import SelectColor from '../selectColor/SelectColor';
import InputBox from '../inputBox/InputBox';
import Button from '../button/Button';


// REDUX
import { connect } from 'react-redux';
import { setConfig } from '../../../../redux/ducks/configDuck';
import { setToken } from '../../../../redux/ducks/tokenDuck'

const ModalNewTask = (props) => {

    const [state, setState] = useState(
        {
            inputColor: null,
            inputTextarea: null,
            inputInputbox: null,

        }
    )

    const handleInput = (handleState) => (e) => {
        let input = e.target.value;

        setState({
            ...state,
            [handleState]: input
        })
    }
    const print = () => {
        console.log(state.inputColor);
        console.log(state.inputTextarea);
        console.log(state.inputInputbox);
    }


    return (
        <div className={props.className}>
            <h2>{props.taskTitle}</h2>
            <h2>Seleziona colore etichetta</h2>
            <InputBox
                type='color'
                placeholder={'inserisci codice'}
                onChangeCallback={handleInput('inputColor')}
            />


            <h4>Inserisci Descrizione</h4>
            <textarea
                onChange={handleInput('inputTextarea')}></textarea>
            <h4>Inserisci Commento</h4>
            <InputBox
                type='text'
                placeholder='inserisci titolo'
                onChangeCallback={handleInput('inputInputbox')}

            />


            <Button
                onClickCallback={print}
            />

        </div>
    );
}

ModalNewTask.defaultProps = {
    // label: 'Press'
}

ModalNewTask.propTypes = {
    // label: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    tokenDuck: state.tokenDuck,
    configDuck: state.configDuck
});

export default connect(mapStateToProps)(ModalNewTask);
