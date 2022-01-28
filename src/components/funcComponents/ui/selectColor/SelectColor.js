import React from 'react';
import Button from '../button/Button';
import InputBox from '../inputBox/InputBox';
import './selectColor.css'


// REDUX
import { connect } from 'react-redux';
import { setConfig } from '../../../../redux/ducks/configDuck';
import { setToken } from '../../../../redux/ducks/tokenDuck'

const SelectColor = (props) => {

    const changeColor = (color) => () => {
        console.log(color);

        let obj = {
            color: color,
        }
        props.dispatch(setToken(obj))


    }



    const importImage = () => {

    }

    const handleInput = (e) => {
        let colorCode = e.target.value;
        console.log(colorCode);
        let obj = {
            color: colorCode,
        }
        props.dispatch(setToken(obj))
    }

    return (
        <>

            <h4>Seleziona il tuo Sfondo</h4>
            <div className='select-color-container'>
                <Button
                    label=''
                    backgroundColor={'red'}
                    onClickCallback={changeColor('red')}
                />

                <Button
                    label=''
                    backgroundColor={'green'}
                    onClickCallback={changeColor('green')}
                />
                <Button
                    label=''
                    backgroundColor={'yellow'}
                    onClickCallback={changeColor('yellow')}
                />
                <Button
                    label='select-image'
                    className='img-button'
                    backgroundColor={'gray'}
                    onClickCallback={importImage}

                />
            </div>

            <InputBox
                type='color'
                placeholder={'inserisci codice'}
                onChangeCallback={handleInput}
            />


        </>
    );
}

const mapStateToProps = state => ({
    tokenDuck: state.tokenDuck,
    configDuck: state.configDuck
});

export default connect(mapStateToProps)(SelectColor);
