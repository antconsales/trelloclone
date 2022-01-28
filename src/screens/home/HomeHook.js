import React, { useState, useEffect } from 'react';
import './home.css'
import Button from '../../components/funcComponents/ui/button/Button';
import InputBox from '../../components/funcComponents/ui/inputBox/InputBox';
import ModalNewDashboard from '../../components/funcComponents/ui/modalNewDashboard/ModalNewDashboard';


// REDUX
import { connect } from 'react-redux';
import { setConfig } from '../../redux/ducks/configDuck';
import { setToken } from '../../redux/ducks/tokenDuck'

const Homehook = (props) => {

    const [state, setState] = useState(
        {
            openModal: false,
            dashboardList: [],
            error: false

        }
    )


    let title = props?.configDuck?.config.title;
    let color = props?.tokenDuck?.token.color;


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
                color
            }
        }
        if (title && color) {
            localStorage.setItem(title, JSON.stringify(objDash))
            openModal = false
        } else {
            error = true;
        }

        setState({
            ...state,
            error,
            openModal,
        })
    }

    //UTILS
    const getAndAssignItems = () => {
        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
        console.log('keys', keys);

        while (i--) {
            values.push(localStorage.getItem(keys[i]));
        }
        let dashboardList = values.map((value) => JSON.parse(value));
        console.log('dashboardList', dashboardList);

        setState({
            ...state,
            dashboardList: dashboardList
        })

    }

    const mapLeaderBoard = (item) => {
        return (

            <div key={item.dashboard.title}>
                <Button
                    backgroundColor={item.dashboard.color}
                    label={item.dashboard.title}
                />
            </div>
        )
    }

    useEffect(() => {
        getAndAssignItems()
        console.log(state.dashboardList);

    }, [])

    return (
        <>
            Home
            <div>
                {
                    state.dashboardList.map(mapLeaderBoard)

                }
            </div>

            <div className='home-container'>
                <p>
                    {
                        props?.tokenDuck?.token.color
                    }
                </p>
                <p>
                    {
                        props?.configDuck?.config.title
                    }
                </p>

                <Button
                    backgroundColor={'gray'}
                    onClickCallback={openCloseModal(true)}
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
        </>
    );
}



const mapStateToProps = state => ({
    tokenDuck: state.tokenDuck,
    configDuck: state.configDuck
});

export default connect(mapStateToProps)(Homehook);
