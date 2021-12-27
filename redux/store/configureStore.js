import {configureStore} from '@reduxjs/toolkit';
import userDataSlice from '../slices/userDataSlice';
import transactionSlice from '../slices/transactionSlice';
import accountsSlice from '../slices/accountsSlice';


const reducer = {
    userDataReducer: userDataSlice,
    transactionReducer: transactionSlice,
    accountsReducer: accountsSlice,

};

const store = configureStore({
    reducer,
});

export default store;
