import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import loginReducer from './loginReducers';
import getUserReducer from './getUserReducer'
import AllUserReducer from './getAllUserReducer'

const appReducers = combineReducers({
    loginReducer,
    getUserReducer,
    AllUserReducer,
    form: formReducer
})

export default appReducers;