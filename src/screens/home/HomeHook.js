import React, { useState, useEffect } from 'react';
import './home.css'
import { useNavigate } from "react-router-dom";

import Button from '../../components/funcComponents/ui/button/Button';
import ModalNewDashboard from '../../components/funcComponents/ui/modalNewDashboard/ModalNewDashboard';
import ButtonDash from '../../components/funcComponents/ui/buttonDash/ButtonDash';


// REDUX
import { connect } from 'react-redux';


const Homehook = (props) => {

    const navigate = useNavigate();
    const [state, setState] = useState(
        {
            openModal: false,
            dashboardList: [],
            error: false,
            saveDashboard: false,
            title: null,
            color: null,

        }
    )


    let title = props?.configDuck?.config.title;
    let color = props?.tokenDuck?.token.color;
    let saveDashboard = false


    const openCloseModal = (bool) => () => {
        setState({
            ...state,
            openModal: bool
        })
    }

    const createDashboard = () => {
        let error = false;
        let openModal = true
        let objDash = {
            dashboard: {
                title,
                color,
                list: []
            }
        }
        if (title && color) {
            localStorage.setItem(title, JSON.stringify(objDash))
            openModal = false
            saveDashboard = true
        } else {
            error = true;
        }

        setState({
            ...state,
            error,
            openModal,
            saveDashboard,
        })
    }

    //UTILS
    const getAndAssignItems = () => {
        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;


        while (i--) {
            values.push(localStorage.getItem(keys[i]));
        }
        let dashboardList = values.map((value) => JSON.parse(value));
        saveDashboard = false


        setState({
            ...state,
            dashboardList: dashboardList,
            saveDashboard,
        })

    }


    const openDash = (key) => () => {

        navigate(
            `/dashboard/${key.dashboard.title}`,
            {
                state: {
                    title: key.dashboard.title,
                    color: key.dashboard.color
                }
            });

    }


    const mapLeaderBoard = (item) => {
        return (

            <div key={item.dashboard.title} className='button-dash'>
                <ButtonDash
                    backgroundColor={item.dashboard.color}
                    label={item.dashboard.title}
                    onClickCallback={openDash(item)}

                />
            </div>
        )
    }


    useEffect(() => {
        getAndAssignItems()


    }, [state.saveDashboard])

    return (


        <>
            <h1 className='home-name'>Trello Clone</h1>
            <div className='home-container'>

                <div className='home-button-modal'>

                    <Button
                        className="home-add-dash-button"
                        backgroundColor={'gray'}
                        onClickCallback={openCloseModal(true)}
                        label='Add Dash'
                    />
                    {
                        state.openModal &&
                        <div>
                            <ModalNewDashboard
                                className='new-dashboard-modal'
                            />

                            <Button
                                label='chiudi'
                                onClickCallback={openCloseModal(false)}
                            />
                            <Button
                                label='salva'
                                onClickCallback={createDashboard}
                            />
                            {
                                state.error &&
                                <span>seleziona colore e dai un titolo</span>
                            }

                        </div>
                    }


                </div>
                <div className='dashboard-button-container'>
                    {
                        state.dashboardList.map(mapLeaderBoard)
                    }
                </div>

            </div>
        </>
    );
}



const mapStateToProps = state => ({
    tokenDuck: state.tokenDuck,
    configDuck: state.configDuck,
    refreshListDuck: state.refreshListDuck
});

export default connect(mapStateToProps)(Homehook);
