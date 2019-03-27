import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import loginReducer from './loginReducers';
import getUserReducer from './getUserReducer'
import AllUserReducer from './getAllUserReducer'
import uploadReducer from './fileUploadReducer'
import UserInfoReducer from './myProfileReducer'


const appReducers = combineReducers({
    loginReducer,
    getUserReducer,
    AllUserReducer,
    uploadReducer,
    UserInfoReducer,
    form: formReducer
})

export default appReducers;