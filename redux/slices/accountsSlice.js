import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const db = firebase.firestore();
const auth = firebase.auth();

// export const getTransactions = createAsyncThunk(
//     'transactions/getTransactions',
//     async () => {
//         return await db.collection('transactions').where('userID', '==', auth.currentUser.uid).get()
//             .then(querySnapshot => {
//                 const transactions = [];
//                 querySnapshot.forEach(documentSnapshot => {
//                     transactions.push({
//                         ...documentSnapshot.data(),
//                         key: documentSnapshot.id,
//                     });
//                 });
//                 transactions.sort((a, b) => parseInt(a.balance) - parseInt(b.balance));
//                 return transactions;
//             });
//     },
// );

export const getTransactions = createAsyncThunk(
    'transactions/getTransactions',
    async (accountNum) => {
        return await db.collection('bankAccounts').doc(accountNum.toString()).collection('transactions').get()
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

export const getAccounts = createAsyncThunk(
    'accounts/getAccounts',
    async () => {
        return await db.collection('bankAccounts').where('userID', '==', auth.currentUser.uid).get()
            .then(querySnapshot => {
                const accounts = [];
                querySnapshot.forEach(documentSnapshot => {
                    accounts.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                return accounts;
            });
    },
);

// export const getAccountNumber = createAsyncThunk(
//     'user/getAccountNumber',
//     async (accountNumber) => {
//         return await db.collection('bankAccounts').where('userID', '==', auth.currentUser.uid).get()
//             .then(async snapShot => {
//                 let accN;
//                 snapShot.forEach(documentSnap => {
//                     accN = documentSnap.get('accountNumber');
//                 });
//                 const accNumRef = db.collection('bankAccounts').doc(accN.toString());
//                 return await db.runTransaction(async (t) => {
//                     const doc = await t.get(accNumRef);
//                     return doc.data().accountNumber;
//                 });
//             });
//     },
// );


const accountsSlice = createSlice({
    name: 'getAccountInfo',
    initialState: {
        accounts: [],
        transactions: [],
        accountNumber: '',
        status: null,
    },
    reducers: {
        createAccount: (state, action) => {
            const {accountType} = action.payload;
            const accountNumber = Math.floor(10000000 + Math.random() * 99999999);
            db.collection('bankAccounts').doc(accountNumber.toString()).set({
                userID: auth.currentUser.uid,
                accountNumber: accountNumber,
                accountType: accountType,
                balance: Math.floor(10000 + Math.random() * 99999),
            });

        },
        setAccountNumber: (state, action) => {
            const {accountNum} = action.payload;
            state.accountNumber = accountNum;
        },
        getAccountNumber: (state, action) => {
            return state.accountNumber;
        },
    },
    extraReducers: {
        [getAccounts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getAccounts.fulfilled]: (state, action) => {
            state.status = 'success';
            state.accounts = action.payload;
        },
        [getAccounts.rejected]: (state, action) => {
            state.status = 'failed';
        },
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

export const {createAccount, setAccountNumber, getAccountNumber} = accountsSlice.actions;

export default accountsSlice.reducer;
