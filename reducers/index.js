import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import loginReducer from './loginReducers';
import getUserReducer from './getUserReducer'

const appReducers = combineReducers({
    loginReducer,
    getUserReducer,
    form: formReducer
})

export default appReducers;