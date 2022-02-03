import { combineReducers } from 'redux'

//API

//DUCK
import configDuck from '../ducks/configDuck'
import tokenDuck from '../ducks/tokenDuck'
import refreshListDuck from '../ducks/refreshListDuck';


const rootReducer = combineReducers({
    configDuck,
    tokenDuck,
    refreshListDuck
});

export default rootReducer
