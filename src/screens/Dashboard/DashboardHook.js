import React, { useState, useEffect } from 'react';
import './dashboard.css'
import { useParams, useLocation } from 'react-router-dom';
import Button from '../../components/funcComponents/ui/button/Button';
import InputBox from '../../components/funcComponents/ui/inputBox/InputBox';
import ButtonList from '../../components/funcComponents/ui/buttonList/ButtonList';
import ModalNewTask from '../../components/funcComponents/ui/modalNewTask/ModalNewTask';

//REDUX
import { connect } from 'react-redux';
import { setRefreshList } from '../../redux/ducks/refreshListDuck';

const Dashboardhook = (props) => {


    const params = useParams()
    const location = useLocation()

    const [state, setState] = useState(
        {
            openInputBox: false,
            error: false,
            saveList: false,
            listTitle: null,
            listOfList: [],
            refreshList: props?.refreshListDuck.token.refreshList,
        }
    )
    console.log('refreshListDuck', props.refreshListDuck)




    const openCloseInputBox = (val) => () => {
        setState({
            ...state,
            openInputBox: val
        })

    }


    const addTitleList = (e) => {
        let listTitle = e.target.value
        setState({
            ...state,
            listTitle,
        })
    }

    const createNewList = () => {
        let error = false;
        let openInputBox = true
        let saveList = false
        let getDashboard = JSON.parse(localStorage.getItem(location.state.title))
        let objList = {

            listTitle: state.listTitle,
            tasks: [],

        }
        if (state.listTitle) {
            getDashboard.dashboard.list.push(objList)
            localStorage.setItem(location.state.title, JSON.stringify(getDashboard))
            openInputBox = false
            saveList = true
        } else {
            error = true;
        }

        setState({
            ...state,
            error,
            openInputBox,
            saveList,
        })
    }

    const getAndAssignItems = () => {

        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;


        while (i--) {
            values.push(JSON.parse(localStorage.getItem(keys[i])));

        }
        // values = JSON.parse(values)

        // values = values.dashboard.list


        let objDash = values.filter((value) => value.dashboard.title === location.state.title);

        let listOfList = objDash[0].dashboard.list.map((value) => value)

        let saveList = false



        setState({
            ...state,
            listOfList: listOfList,
            saveList,
            refreshList: props?.refreshListDuck.token.refreshList
        })

    }


    const mapLeaderBoard = (item, key) => {
        return (

            <div key={key}>
                <ButtonList
                    backgroundColor={'grey'}
                    label={item.listTitle}
                    keyStore={location.state.title}
                    listTitle={item.listTitle}
                    refreshList={state.refreshList}
                />
            </div>
        )
    }


    //DA CONTROLLARE
    const closeModalTask = () => {
        location.state.modalTask = false
        setState({
            ...state,

        })
    }


    useEffect(() => {
        getAndAssignItems()
        console.log('start props', props.refreshListDuck);
        console.log('refresh list dashboard', state.refreshList)
        // let obj = {
        //     refreshList: state.refreshList,
        // }
        // props.dispatch(setRefreshList(obj))


        // setState({
        //     ...state,
        //     refreshList: false
        // })

    }, [state.saveList, props?.refreshListDuck.token.refreshList, state.refreshList])

    return (
        <div style={{ backgroundColor: location.state.color }} className='dashboard-container'>
            <h2 className='dashboard-name'> Dashboard {location.state.title} </h2>

            <div className='list-container'>

                {
                    !state.openInputBox &&

                    <Button
                        className='button-new-list'
                        label="Aggiungi un'altra lista"
                        onClickCallback={openCloseInputBox(true)}
                    />
                }
                
                {
                    state.listOfList.map(mapLeaderBoard)
                }

                {
                    state.openInputBox &&

                    <div>
                        <InputBox
                            placeholder='inserisci titolo alla tua lista'
                            onChangeCallback={addTitleList}
                        />
                        <Button
                            label='Aggiungi lista'
                            onClickCallback={createNewList}
                        />
                        <Button
                            label='X'
                            onClickCallback={openCloseInputBox(false)}
                        />
                    </div>
                }
            </div>


            {
                location.state.modalTask &&
                <div>
                    <ModalNewTask
                        taskTitle={location.state.taskTitle}
                        className='modal-new-task'
                        positionList={location.state.positionList}
                        dashTitle={location.state.title}
                        listOfTasks={location.state.listOfTasks}
                    />
                    <Button
                        onClickCallback={closeModalTask}
                        label='X' />
                </div>
            }

        </div>
    );
}

const mapStateToProps = state => ({
    refreshListDuck: state.refreshListDuck
});

export default connect(mapStateToProps)(Dashboardhook);
