import React, { useState, useEffect } from 'react';
import './dashboard.css'
import { useParams, useLocation } from 'react-router-dom';
import Button from '../../components/funcComponents/ui/button/Button';
import InputBox from '../../components/funcComponents/ui/inputBox/InputBox';
import ButtonList from '../../components/funcComponents/ui/buttonList/ButtonList';

const Dashboardhook = (props) => {


    const params = useParams()
    const location = useLocation()

    const [state, setState] = useState(
        {
            openInputBox: false,
            error: false,
            saveList: false,
            listTitle: null,
            listOfList: []


        }
    )
    console.log('location', location)
    console.log('title', params)
    console.log('color', location.state.color)




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
        console.log('keys', keys);

        while (i--) {
            values.push(JSON.parse(localStorage.getItem(keys[i])));

        }
        // values = JSON.parse(values)

        // values = values.dashboard.list
        console.log('values', values);

        let objDash = values.filter((value) => value.dashboard.title === location.state.title);

        let listOfList = objDash[0].dashboard.list.map((value) => value)
        console.log('listOfList', listOfList);
        let saveList = false


        setState({
            ...state,
            listOfList: listOfList,
            saveList,
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
                />
            </div>
        )
    }


    useEffect(() => {
        getAndAssignItems()
        // console.log(state.listOfList);


    }, [state.saveList])

    return (
        <div style={{ backgroundColor: location.state.color }} className='dashboard-container'>
            Dashboard {location.state.title}
            <br />

            <div className='list-container'>
                {
                    state.listOfList.map(mapLeaderBoard)

                }

                {
                    !state.openInputBox &&

                    <Button
                        className='button-new-list'
                        label="Aggiungi un'altra lista"
                        onClickCallback={openCloseInputBox(true)}
                    />
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

        </div>
    );
}

export default Dashboardhook;
