import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const db = firebase.firestore();
const auth = firebase.auth();

export const getTransactions = createAsyncThunk(
    'transactions/getTransactions',
    async () => {
        return await db.collection('transactions').where('userID', '==', auth.currentUser.uid).get()
            .then(querySnapshot => {
                const transactions = [];
                querySnapshot.forEach(documentSnapshot => {
                    transactions.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                transactions.sort((a, b) => parseInt(a.balance) - parseInt(b.balance));
                return transactions;
            });
    },
);

const accountsSlice = createSlice({
    name: 'getAccountInfo',
    initialState: {
        transactions: [],
        status: null,
    },
    extraReducers: {
        [getTransactions.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getTransactions.fulfilled]: (state, action) => {
            state.status = 'success';
            state.transactions = action.payload;
        },
        [getTransactions.rejected]: (state, action) => {
            state.status = 'failed';
        },
    },
});

export default accountsSlice.reducer;
