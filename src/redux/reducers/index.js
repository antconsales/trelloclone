import { combineReducers } from 'redux'

//API

//DUCK
import configDuck from '../ducks/configDuck'
import tokenDuck from '../ducks/tokenDuck'

const rootReducer = combineReducers({
    configDuck,
    tokenDuck
});

export default rootReducer
