import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const db = firebase.firestore();
const auth = firebase.auth();


export const getTransactions = createAsyncThunk(
    'transactions/getTransactions',
    async () => {
        // return await db.collection('transactions').where('userID', '==', auth.currentUser.uid)
        //     .onSnapshot(querySnapshot => {
        //         const transactions = [];
        //
        //         querySnapshot.forEach(documentSnapshot => {
        //             transactions.push({
        //                 ...documentSnapshot.data(),
        //                 key: documentSnapshot.id,
        //             });
        //         });
        //         console.log(transactions);
        //     });

        // return await db.collection('transactions').where('userID', '==', auth.currentUser.uid)
        //     .onSnapshot(querySnapshot => {
        //         const transactions = [];
        //         querySnapshot.forEach(documentSnapshot => {
        //             transactions.push({
        //                 ...documentSnapshot.data(),
        //                 key: documentSnapshot.id,
        //             });
        //         });
        //         return JSON.stringify(transactions);
        //     });

        return await db.collection('transactions').where('userID', '==', auth.currentUser.uid)
            .onSnapshot(querySnapshot => {
                const transactions = [];

                querySnapshot.forEach(documentSnapshot => {
                    transactions.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                    return 'hey';
                });
            });

        console.log(transaction);
        return 'hey';

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
    // reducers: {
    //     getTransactions: (state, action) => {
    //
    //     }
    // }
});


export default accountsSlice.reducer;
