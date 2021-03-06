import React, { useState, useEffect } from 'react';
import './buttonList.css'

import { useNavigate, useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'

import Button from '../button/Button';
import InputBox from '../inputBox/InputBox';
import ModalNewTask from '../modalNewTask/ModalNewTask';
//  REDUX
import { connect } from 'react-redux';
import { setListTitle } from '../../../../redux/ducks/listTitleDuck ';
import { setRefreshList } from '../../../../redux/ducks/refreshListDuck';

const ButtonList = (props) => {

    const location = useLocation()
    const navigate = useNavigate();


    const [state, setState] = useState(
        {
            isDeleted: false,
            openInputBox: false,
            taskTitle: null,
            error: false,
            saveTask: false,
            listOfTasks: [],
            getDashboard: JSON.parse(localStorage.getItem(location.state.title)),
            positionList: null,
            moveTask: false,
            listOfTitleList: null,
            listOpened: false,
            newListOfTasks: null,
            getNewList: null,
            nameRefreshList: null,
        }
    )


    let positionList = state.getDashboard.dashboard.list.map(x => x.listTitle).indexOf(props.listTitle)
    let listOfTitleList = state.getDashboard.dashboard.list.map(x => x.listTitle)

    const deleteList = (e) => {
        let isDeleted = true;
        let newObjDash = null;
        let objDash = JSON.parse(localStorage.getItem(props.keyStore))

        let objDashList = objDash.dashboard.list
        let list = objDashList.filter((item) => item.listTitle !== props.label)
        let dashboard = objDash.dashboard
        newObjDash = { dashboard: { ...dashboard, list: list } }
        localStorage.removeItem(props.keyStore)

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
            description: "",
            comments: [],
            label: "",
        }
        if (state.taskTitle) {
            k = state.getDashboard.dashboard.list.map(x => x.listTitle).indexOf(title)
            state.getDashboard.dashboard.list[k].tasks.push(objTask)
            //console.log(state.getDashboard);
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

        let getDashboard = JSON.parse(localStorage.getItem(location.state.title));
        positionList = getDashboard.dashboard.list.map(x => x.listTitle).indexOf(props.listTitle)
        let listOfTasks = getDashboard.dashboard.list[positionList].tasks.map(x => x.taskTitle)

        let listOfTasks2 = getDashboard.dashboard.list.map(x => (x.tasks.map(y => y.taskTitle)))

        //console.log('listOfTasks', listOfTasks);
        let saveTask = false

        listOfTitleList = getDashboard.dashboard.list.map(x => x.listTitle)
        console.log('ioSono la lista creata', props.listTitle);
        console.log('ioSono la lista dei task di', props.listTitle, listOfTitleList);
        setState({
            ...state,
            listOfTasks,
            saveTask,
            positionList: positionList,
            moveTask: false,
            listOfTitleList: listOfTitleList,
            listOpened: false,
            getDashboard
        })

    }

    const getAndAssignItemsNew = (name) => {
        console.log('name', name);
        let getDashboard = JSON.parse(localStorage.getItem(location.state.title));
        positionList = getDashboard.dashboard.list.map(x => x.listTitle).indexOf(name)
        let listOfTasks = getDashboard.dashboard.list[positionList].tasks.map(x => x.taskTitle)
        console.log('listOfTasks nuovii', listOfTasks);
        // let listOfTasks2 = getDashboard.dashboard.list.map(x => (x.tasks.map(y => y.taskTitle)))

        //console.log('listOfTasks', listOfTasks);
        let saveTask = false

        listOfTitleList = getDashboard.dashboard.list.map(x => x.listTitle)
        console.log('ioSono la lista creata', name);
        console.log('ioSono la lista dei task di', name, listOfTitleList);
        setState({
            ...state,
            listOfTasks,
            saveTask,
            positionList: positionList,
            moveTask: false,
            listOfTitleList: listOfTitleList,
            listOpened: false,
            getDashboard
        })
        props.dispatch(setRefreshList(false))
    }

    const moveUp = (name) => () => {
        let listOfTasks = state.listOfTasks
        let old_index = listOfTasks.indexOf(name)
        let new_index = old_index - 1
        //console.log(listOfTasks);
        while (old_index < 0) {
            old_index += listOfTasks.length;
        }
        while (new_index < 0) {
            new_index += listOfTasks.length;
        }
        if (new_index >= listOfTasks.length) {
            var k = new_index - listOfTasks.length + 1;
            while (k--) {
                listOfTasks.push(undefined);
            }
        }
        // listOfTasks.splice(new_index, 0, listOfTasks.splice(old_index, 1)[0]);
        listOfTasks = state.getDashboard.dashboard.list[positionList].tasks.splice(new_index, 0, state.getDashboard.dashboard.list[positionList].tasks.splice(old_index, 1)[0])
        localStorage.setItem(location.state.title, JSON.stringify(state.getDashboard))
        //console.log(listOfTasks);  // for testing
        setState({
            ...state,
            listOfTasks,
            moveTask: true
        })
    }


    const moveDown = (name) => () => {
        let listOfTasks = state.listOfTasks
        let old_index = listOfTasks.indexOf(name)
        let new_index = old_index + 1
        //console.log(listOfTasks);
        while (old_index < 0) {
            old_index += listOfTasks.length;
        }
        while (new_index < 0) {
            new_index += listOfTasks.length;
        }
        if (new_index >= listOfTasks.length) {
            var k = new_index - listOfTasks.length + 1;
            while (k--) {
                listOfTasks.push(undefined);
            }
        }
        // listOfTasks.splice(new_index, 0, listOfTasks.splice(old_index, 1)[0]);
        listOfTasks = state.getDashboard.dashboard.list[positionList].tasks.splice(new_index, 0, state.getDashboard.dashboard.list[positionList].tasks.splice(old_index, 1)[0])
        localStorage.setItem(location.state.title, JSON.stringify(state.getDashboard))
        console.log(listOfTasks);  // for testing
        setState({
            ...state,
            listOfTasks,
            moveTask: true
        })
    }

    const deleteTask = (nameTask) => () => {
        let newObjTasks = null;
        let getDashboard = JSON.parse(localStorage.getItem(location.state.title))
        positionList = getDashboard.dashboard.list.map(x => x.listTitle).indexOf(props.listTitle)
        let listOfTasks = getDashboard.dashboard.list[positionList].tasks.map(x => x.taskTitle)
        let tasksList = getDashboard.dashboard.list[positionList].tasks.filter((item) => item.taskTitle !== nameTask)
        // let dashboard = getDashboard.dashboard
        newObjTasks = getDashboard
        newObjTasks.dashboard.list[positionList].tasks = tasksList
        console.log('newObjTasks', newObjTasks);

        localStorage.setItem(location.state.title, JSON.stringify(newObjTasks))
        setState({
            ...state,
            saveTask: true
        })

    }

    const maptasks = (item, key) => {
        return (
            <div key={key} className='button-list-task'>
                <div className='up-down-button-task'>
                    <Button
                        className="button-up"
                        label='UP'
                        onClickCallback={moveUp(item)}
                    />
                    <Button
                        className="button-up"
                        label='DOWN'
                        onClickCallback={moveDown(item)}
                    />
                </div>
                <Button
                    className="task"
                    backgroundColor={'lightgrey'}
                    label={item}
                    onClickCallback={openModelTaskDash(item)}
                // keyStore={location.state.title}
                />
                <select className="select-list-task" onChange={changeList(item)} onClick={refrheshlist} >
                    {
                        state.listOfTitleList.map(mapList(item))
                    }
                </select>

                <Button
                    className="delete"
                    backgroundColor={'lightgrey'}
                    label='X'
                    onClickCallback={deleteTask(item)}
                // keyStore={location.state.title}
                />
            </div>
        )
    }

    const refrheshlist = () => {
        props.dispatch(setRefreshList(false))
        //props.dispatch(setRefreshList(false))
        setState({
            ...state,
            listOpened: true,
        })
    }

    const changeList = (taskName) => (e) => {

        let name = e.target.value
        let getOldList = state.getDashboard.dashboard.list.map(x => x.listTitle).indexOf(props.listTitle)
        let indexOfTask = state.getDashboard.dashboard.list[getOldList].tasks.map(y => y.taskTitle).indexOf(taskName)
        let getTask = state.getDashboard.dashboard.list[getOldList].tasks.splice(indexOfTask, 1)
        let getNewList = state.getDashboard.dashboard.list.map(x => x.listTitle).indexOf(name)
        let getObjTask = getTask[0]
        state.getDashboard.dashboard.list[getNewList].tasks.unshift(getObjTask)
        localStorage.setItem(location.state.title, JSON.stringify(state.getDashboard))
        let getDashboard = JSON.parse(localStorage.getItem(location.state.title));
        let listOfTasksTwo = getDashboard.dashboard.list[getNewList].tasks.map(x => x.taskTitle)
        listOfTasksTwo.map(maptasks)

        console.log('Dashboard change list', getDashboard)

        console.log('listOfTasksChangeList', listOfTasksTwo)

        setState({
            ...state,
            moveTask: true,
            listOfTasks: listOfTasksTwo,
            getDashboard,
            getNewList,
            nameRefreshList: name


        })

        props.dispatch(setRefreshList(true))
    }

    const mapList = (taskName) => (listName) => {
        return (
            <option value={listName} key={listName}>{listName}</option>
        )
    }


    const openModelTaskDash = (key) => () => {
        navigate(
            `/dashboard/${location.state.title}`,
            {
                state: {
                    title: location.state.title,
                    modalTask: true,
                    taskTitle: key,
                    color: location.state.color,
                    positionList: positionList,
                    listOfTasks: state.listOfTasks
                }
            });
        let obj = {
            listTitle: state.positionList,
        }
        props.dispatch(setListTitle(obj))
    }

    useEffect(() => {
        getAndAssignItems()
        console.log('io sono props.LIST', props.listTitle);
        console.log('io sono nameRefreshList', state.nameRefreshList);
        console.log('REDUX', props?.refreshListDuck?.token);
        // if (props.listTitle !== state.nameRefreshList) {
        //     getAndAssignItems()
        // }
        // else if (state.nameRefreshList === props.listTitle) {
        //     getAndAssignItems()
        // }


    }, [state.saveTask, state.moveTask, state.listOpened, props?.refreshListDuck?.token])

    return (

        <>
            {
                state.isDeleted === false &&
                <>
                    <div
                        className={'button-list-default' + ' ' + props.className}
                        style={{
                            backgroundColor: props.backgroundColor
                        }}
                    >
                        <Button
                            className="button-close"
                            label="X"
                            onClickCallback={deleteList} />
                        {props.label}
                    </div>

                    {
                        !state.openInputBox &&

                        <Button
                            className="button-add-task"
                            label="+ add a new task"
                            onClickCallback={openCloseInputBox(true)} />
                    }
                    <div>
                        {
                            state.listOfTasks.map(maptasks)
                        }
                    </div>


                    {
                        state.openInputBox &&

                        <div className='modal-new-task'>
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

const mapStateToProps = state => ({
    listTitleDuck: state.listTitleDuck,
    refreshListDuck: state.refreshListDuck
});

export default connect(mapStateToProps)(ButtonList);

