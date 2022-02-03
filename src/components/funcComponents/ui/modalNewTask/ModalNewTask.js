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
            // getDashboard: JSON.parse(localStorage.getItem(props.dashTitle)),
            taskTitle: null,
            positionList: null,
            listOfTasks: null,
            listOfComments: [],
            saveComment: false,
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
        //console.log(state.inputColor);
        //console.log(state.inputTextarea);
        //console.log(state.inputInputbox);
    }

    const saveColorLabel = () => {
        let getDashboard = JSON.parse(localStorage.getItem(props.dashTitle))
        let error = false;
        let k = null;
        let saveColorLabel = false
        let strColorLabel = state.inputColor

        if (state.inputColor) {
            k = getDashboard.dashboard.list[props.positionList].tasks.map(x => x.taskTitle).indexOf(props.taskTitle)
            getDashboard.dashboard.list[props.positionList].tasks[k].label = strColorLabel
            localStorage.setItem(props.dashTitle, JSON.stringify(getDashboard))
            // openInputBox = false
            // saveDescription = true
        } else {
            error = true;
        }

        // setState({
        //     ...state,
        //     error,
        //     openInputBox,
        //     saveDescription,
        //     positionList: k
        // })
    }

    const saveDescription = () => {
        let getDashboard = JSON.parse(localStorage.getItem(props.dashTitle))
        let error = false;
        let k = null;
        let saveDescription = false
        let strDescription = state.inputTextarea

        if (state.inputTextarea) {
            k = getDashboard.dashboard.list[props.positionList].tasks.map(x => x.taskTitle).indexOf(props.taskTitle)
            getDashboard.dashboard.list[props.positionList].tasks[k].description = strDescription
            localStorage.setItem(props.dashTitle, JSON.stringify(getDashboard))
            // openInputBox = false
            // saveDescription = true
        } else {
            error = true;
        }

        // setState({
        //     ...state,
        //     error,
        //     openInputBox,
        //     saveDescription,
        //     positionList: k
        // })
    }


    const saveComments = () => {
        let getDashboard = JSON.parse(localStorage.getItem(props.dashTitle))
        let error = false;
        let k = null;
        let saveComment = false
        let objComments = {
            comment: state.inputInputbox
        }

        if (state.inputInputbox) {
            k = getDashboard.dashboard.list[props.positionList].tasks.map(x => x.taskTitle).indexOf(props.taskTitle)
            getDashboard.dashboard.list[props.positionList].tasks[k].comments.push(objComments)
            localStorage.setItem(props.dashTitle, JSON.stringify(getDashboard))
            saveComment = true
            // openInputBox = false
            // saveDescription = true
        } else {
            error = true;
        }

        setState({
            ...state,
            saveComment
        })
    }


    const getAndAssignItems = () => {
        let listOfTasks = props.listOfTasks
        let getDashboard = JSON.parse(localStorage.getItem(props.dashTitle))
        let k = getDashboard.dashboard.list[props.positionList].tasks.map(x => x.taskTitle).indexOf(props.taskTitle)
        let listOfComments = getDashboard.dashboard.list[props.positionList].tasks[k].comments.map(x => x.comment)
        //console.log('listOfComments', listOfComments);

        setState({
            ...state,
            listOfTasks,
            listOfComments,
            taskTitle: props.taskTitle,
            saveComment: false
        })

    }

    const maptasks = (item, key) => {
        return (

            <ul key={key}>
                <li>{item}</li>
                <Button
                    label='X'
                />
            </ul>
        )
    }

    useEffect(() => {
        getAndAssignItems()


        // setState({
        //     ...state,
        //     positionList: props.positionList,
        //     taskTitle: props.taskTitle
        // })

    }, [state.taskTitle])


    return (
        <div className={props.className}>
            <h2>{props.taskTitle}</h2>
            {
                props?.listTitleDuck?.config.listTitle
            }
            <div>
                <h2>Seleziona colore etichetta</h2>
                <InputBox
                    type='color'
                    placeholder={'inserisci codice'}
                    onChangeCallback={handleInput('inputColor')}
                />
                <Button
                    onClickCallback={saveColorLabel}
                    label='SALVA'
                />
            </div>
            <div>
                <h4>Inserisci Descrizione</h4>
                <textarea
                    onChange={handleInput('inputTextarea')}></textarea>
                <Button
                    onClickCallback={saveDescription}
                    label='SALVA'
                />
            </div>
            <div>
                <h4>Inserisci Commento</h4>
                <InputBox
                    type='text'
                    placeholder='inserisci titolo'
                    onChangeCallback={handleInput('inputInputbox')}
                />
                <Button
                    onClickCallback={saveComments}
                    label='SALVA'
                />
                {
                    state.listOfComments.map(maptasks)

                }
            </div>




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
    listTitleDuck: state.listTitleDuck
});

export default connect(mapStateToProps)(ModalNewTask);
