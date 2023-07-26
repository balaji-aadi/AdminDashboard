import {configureStore,combineReducers} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import productReducer from './productSlice'

const persistConfig = {
    key : "root",
    version : 1,
    storage
}

const reducer = combineReducers({
    user : userReducer,
    product : productReducer
})

const presistedReducer = persistReducer(persistConfig,reducer);

export default configureStore({
    reducer : presistedReducer
});
