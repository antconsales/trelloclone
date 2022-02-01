import React, { useState, useEffect } from 'react';
import './buttonList.css'

import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'
import Button from '../button/Button';
import InputBox from '../inputBox/InputBox';

const ButtonList = (props) => {

    const location = useLocation()

    const [state, setState] = useState(
        {
            isDeleted: false,
            openInputBox: false,
            taskTitle: null,
            error: false,
            saveTask: false,
            listOfTasks: [],
            getDashboard: JSON.parse(localStorage.getItem(location.state.title)),


        }
    )

    let positionList = state.getDashboard.dashboard.list.map(x => x.listTitle).indexOf(props.listTitle)


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

    const openCloseInputBox = (val) => () => {
        setState({
            ...state,
            openInputBox: val
        })

    }

    const addTextTask = (e) => {
        let textTask = e.target.value
        setState({
            ...state,
            taskTitle: textTask
        })
    }

    const createNewTask = (title) => () => {
        let error = false;
        let k = null;
        let openInputBox = true
        let saveTask = false
        let objTask = {
            taskTitle: state.taskTitle,
        }
        if (state.taskTitle) {
            k = state.getDashboard.dashboard.list.map(x => x.listTitle).indexOf(title)
            state.getDashboard.dashboard.list[k].tasks.push(objTask)
            console.log(state.getDashboard);
            localStorage.setItem(location.state.title, JSON.stringify(state.getDashboard))
            openInputBox = false
            saveTask = true
        } else {
            error = true;
        }

        setState({
            ...state,
            error,
            openInputBox,
            saveTask,
            positionList: k
        })
    }



    const getAndAssignItems = () => {
        console.log('posistio', positionList);
        let listOfTasks = state.getDashboard.dashboard.list[positionList].tasks.map(x => x.taskTitle)
        console.log('listOfTasks', listOfTasks);
        let saveTask = false


        setState({
            ...state,
            listOfTasks,
            saveTask,
        })

    }
    const maptasks = (item, key) => {
        return (

            <div key={key}>
                <Button
                    backgroundColor={'grey'}
                    label={item}
                // keyStore={location.state.title}
                />
            </div>
        )
    }

    useEffect(() => {
        getAndAssignItems()
        console.log('inizio');


    }, [state.saveTask])

    return (

        <>

            <h1>TITOLO LISTA  {props.listTitle}</h1>
            {
                state.isDeleted === false &&
                <>
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
                    <div>
                        {
                            state.listOfTasks.map(maptasks)

                        }
                    </div>



                    {
                        !state.openInputBox &&

                        <Button
                            className="button-add-task"
                            label="+ aggiungi una scheda"
                            onClickCallback={openCloseInputBox(true)} />
                    }


                    {
                        state.openInputBox &&

                        <div>
                            <InputBox
                                placeholder='inserisci titolo alla tua scheda'
                                onChangeCallback={addTextTask}
                            />
                            <Button
                                label='Aggiungi scheda'
                                onClickCallback={createNewTask(props.listTitle)}
                            />
                            <Button
                                label='X'
                                onClickCallback={openCloseInputBox(false)}
                            />
                        </div>
                    }
                </>
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

