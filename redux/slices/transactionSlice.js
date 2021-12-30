import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const db = firebase.firestore();
const auth = firebase.auth();

export const initiateTransactionThunk = createAsyncThunk(
    'transaction/getRecipientUserThunk',
    async (recipientUser) => {
        const rUser = recipientUser.valueOf();
        const currentAccount = db.collection('bankAccounts').doc(rUser.currentAccountNumber.toString());
        const recipientAccount = db.collection('bankAccounts').doc(rUser.accountNumber.toString());
        // const recipientTransaction = db.collection('transactions').doc();
        // const currentTransaction = db.collection('transactions').doc();
        const recipientTransaction = db.collection('bankAccounts').doc(rUser.accountNumber.toString()).collection('transactions').doc();
        const currentTransaction = db.collection('bankAccounts').doc(rUser.currentAccountNumber.toString()).collection('transactions').doc();
        const currentUser = await db.collection('users').doc(auth.currentUser.uid).get()
            .then(documentSnapshot => {
                return documentSnapshot.data();
            });

        try {
            db.runTransaction(async (t) => {
                const currentDoc = await t.get(currentAccount);
                const newCurrentBalance = currentDoc.data().balance - parseInt(rUser.sendAmount);

                if (newCurrentBalance > 0) {
                    t.update(currentAccount, {balance: newCurrentBalance});
                    t.set(currentTransaction, {
                        userID: auth.currentUser.uid,
                        amount: rUser.sendAmount,
                        transferStatus: 'Sent',
                        sentTo: rUser.accountNumber,
                        firstName: rUser.firstName,
                        lastName: rUser.lastName,
                        balance: newCurrentBalance,
                    });

                    const recipientDoc = await t.get(recipientAccount);
                    const newRecipientBalance = recipientDoc.data().balance + parseInt(rUser.sendAmount);
                    t.update(recipientAccount, {balance: newRecipientBalance});
                    t.set(recipientTransaction, {
                        userID: await recipientAccount.get()
                            .then(documentSnapshot => {
                                return documentSnapshot.get('userID');
                            }),
                        amount: rUser.sendAmount,
                        transferStatus: 'Received',
                        receivedFrom: rUser.currentAccountNumber,
                        firstName: currentUser.firstName,
                        lastName: currentUser.lastName,
                        balance: newRecipientBalance,
                    });
                } else {
                    alert('Insufficient Funds!');
                }
                alert('Transaction Successful!');
            });
        } catch (e) {
            console.log(e);
        }
    },
);

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        recipientUser: {},
        transaction: {},
        status: null,
    },

});

export default transactionSlice.reducer;
