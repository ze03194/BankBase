import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const db = firebase.firestore();
const auth = firebase.auth();

export const getBalance = createAsyncThunk(
    'user/getBalance',
    async (accountNumber) => {
        return await db.collection('bankAccounts').doc(accountNumber.toString()).get()
            .then(async documentSnapshot => {
                return await documentSnapshot.get('balance');
            });
    },
);

export const getUser = createAsyncThunk(
    'user/getUser',
    async () => {
        const userRef = db.collection('users').doc(auth.currentUser.uid);
        try {
            return await db.runTransaction(async (t) => {
                const doc = await t.get(userRef);
                return doc.data();
            });
        } catch (e) {
            console.log(e);
        }
    },
);

export const getLogin = createAsyncThunk(
    'user/login',
    async (userLogin) => {
        const userCredentials = userLogin.valueOf();
        await auth.signInWithEmailAndPassword(userCredentials.emailAddress, userCredentials.password)
            .then(result => {
                console.log(result);
            });
    },
);

const userDataSlice = createSlice({
    name: 'getUser',
    initialState: {
        currentUser: {},
        accountNumber: '',
        balance: 0,
        status: null,
    },
    reducers: {
        addUser: (state, action) => {
            const {newUser} = action.payload;
            // const accNum = Math.floor(10000000 + Math.random() * 99999999);

            auth.createUserWithEmailAndPassword(newUser.emailAddress, newUser.password)
                .then(() => {
                    db.collection('users')
                        .doc(auth.currentUser.uid)
                        .set({
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            emailAddress: newUser.emailAddress,
                            address1: newUser.address1,
                            address2: newUser.address2,
                            city: newUser.city,
                            state: newUser.state,
                            zipCode: newUser.zipCode,
                        });
                    // .then(() => {
                    //     db.collection('bankAccounts').doc(accNum.toString()).set({
                    //         userID: auth.currentUser.uid,
                    //         balance: Math.floor(10000 + Math.random() * 99999),
                    //         accountNumber: accNum,
                    //     })
                    //         .then((result) => {
                    //             console.log(result);
                    //         });
                    // });
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
    extraReducers: {
        [getUser.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getUser.fulfilled]: (state, action) => {
            state.status = 'success';
            state.currentUser = action.payload;
        },
        [getUser.rejected]: (state, action) => {
            state.status = 'failed';
        },

        // [getAccountNumber.pending]: (state, action) => {
        //     state.status = 'loading';
        // },
        // [getAccountNumber.fulfilled]: (state, action) => {
        //     state.status = 'success';
        //     state.accountNumber = action.payload;
        // },
        // [getAccountNumber.rejected]: (state, action) => {
        //     state.status = 'failed';
        // },
        [getBalance.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getBalance.fulfilled]: (state, action) => {
            state.status = 'success';
            state.balance = action.payload;
        },
        [getBalance.rejected]: (state, action) => {
            state.status = 'failed';
        },

    },
});

export const {addUser} = userDataSlice.actions;

export default userDataSlice.reducer;
