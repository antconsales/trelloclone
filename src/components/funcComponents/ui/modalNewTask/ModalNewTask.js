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
            inputColor: "",
            inputTextarea: "",
            inputInputbox: "",
            getDashboard: JSON.parse(localStorage.getItem(props.dashTitle)),
            taskTitle: null,
            positionList: null,
            listOfTasks: null,
            listOfComments: [],
            saveComment: false,
            description: null,
            color: null
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

        setState({
            ...state,
            error,
            color: state.inputColor
        })
    }
    const updateColor = () => {
        setState({
            ...state,
            color: null
        })
    }

    const saveDescription = () => {
        let getDashboard = JSON.parse(localStorage.getItem(props.dashTitle))
        let error = false;
        let k = null;
        let saveComment = state.saveComment
        let strDescription = state.inputTextarea

        if (state.inputTextarea) {
            k = getDashboard.dashboard.list[props.positionList].tasks.map(x => x.taskTitle).indexOf(props.taskTitle)
            getDashboard.dashboard.list[props.positionList].tasks[k].description = strDescription
            localStorage.setItem(props.dashTitle, JSON.stringify(getDashboard))
            // openInputBox = false
            saveComment = true

        } else if (!state.inputTextarea && !state.description) {
            k = getDashboard.dashboard.list[props.positionList].tasks.map(x => x.taskTitle).indexOf(props.taskTitle)
            getDashboard.dashboard.list[props.positionList].tasks[k].description = strDescription
            localStorage.setItem(props.dashTitle, JSON.stringify(getDashboard))
            // openInputBox = false
            saveComment = true
        }
        else {
            error = true;
        }

        setState({
            ...state,
            error,
            description: strDescription,
            // inputTextarea,
            // openInputBox,
            saveComment,
            // positionList: k
        })
    }

    const updateDescription = () => {
        setState({
            ...state,
            description: null,
        })
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
            saveComment,
            inputInputbox: ""
        })
    }
    const deleteComment = (nameComment) => () => {
        console.log(nameComment);
        let newObjComment = null;
        let getDashboard = JSON.parse(localStorage.getItem(props.dashTitle))
        // console.log("objComment", objComment);

        let k = getDashboard.dashboard.list[props.positionList].tasks.map(x => x.taskTitle).indexOf(props.taskTitle)
        let commentsList = getDashboard.dashboard.list[props.positionList].tasks[k].comments.filter((item) => item.comment !== nameComment)
        let dashboard = getDashboard.dashboard
        let list = getDashboard.dashboard.list
        let tasks = getDashboard.dashboard.list.tasks
        newObjComment = getDashboard
        newObjComment.dashboard.list[props.positionList].tasks[k].comments = commentsList
        console.log('newObjComment', newObjComment);

        localStorage.setItem(props.dashTitle, JSON.stringify(newObjComment))
        setState({
            ...state,
            saveComment: true
        })

    }

    const getAndAssignItems = () => {
        let listOfTasks = props.listOfTasks
        let getDashboard = JSON.parse(localStorage.getItem(props.dashTitle))
        let k = getDashboard.dashboard.list[props.positionList].tasks.map(x => x.taskTitle).indexOf(props.taskTitle)
        let listOfComments = getDashboard.dashboard.list[props.positionList].tasks[k].comments.map(x => x.comment)
        let color = getDashboard.dashboard.list[props.positionList].tasks[k].label
        let description = getDashboard.dashboard.list[props.positionList].tasks[k].description
        console.log('description', description);
        console.log('color', state.color);

        setState({
            ...state,
            listOfTasks,
            listOfComments,
            taskTitle: props.taskTitle,
            saveComment: false,
            description,
            inputTextarea: description,
            color
        })

    }

    const mapComment = (item, key) => {
        return (

            <ul key={key}>
                <li>{item}</li>
                <Button
                    label='X'
                    onClickCallback={deleteComment(item)}

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

    }, [state.taskTitle, props.taskTitle, state.saveComment])


    return (
        <div className={props.className}>
            <h2>{props.taskTitle}</h2>
            {
                props?.listTitleDuck?.config.listTitle
            }

            {
                !state.color &&

                <div>
                    <h2>Seleziona colore etichetta</h2>
                    <InputBox
                        type='color'
                        placeholder={'inserisci codice'}
                        onChangeCallback={handleInput('inputColor')}
                        value={state.inputColor}
                    />
                    <Button
                        onClickCallback={saveColorLabel}
                        label='SALVA'
                    />
                </div>
            }
            {
                state.color &&

                <div>
                    <h2> Colore etichetta</h2>
                    <div style={{ backgroundColor: state.color, width: '30px', height: '30px' }}>

                    </div>
                    <Button
                        onClickCallback={updateColor}
                        label='Modifica'
                    />
                </div>
            }


            {
                !state.description &&
                <div>
                    <h4>Inserisci Descrizione</h4>
                    <textarea
                        onChange={handleInput('inputTextarea')} value={state.inputTextarea}></textarea>
                    <Button
                        onClickCallback={saveDescription}
                        label='SALVA'
                    />
                    {/* //PER IL MERGE */}
                    <h4>{state.description}</h4>
                </div>
            }

            {
                state.description &&
                <div>
                    <h4>Descrizione</h4>
                    <h4>{state.description}</h4>
                    <Button
                        onClickCallback={updateDescription}
                        label='MODIFICA'
                    />
                    {/* //PER IL MERGE */}

                </div>
            }

            <div>
                <h4>Inserisci Commento</h4>
                <InputBox
                    type='text'
                    placeholder='inserisci titolo'
                    onChangeCallback={handleInput('inputInputbox')}
                    value={state.inputInputbox}
                />
                <Button
                    onClickCallback={saveComments}
                    label='SALVA'
                />
                {
                    state.listOfComments.map(mapComment)

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
