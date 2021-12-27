/* eslint-disable */
import React, {useState} from 'react';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipientUserThunk} from './redux/slices/transactionSlice';

const db = firebase.firestore();
const auth = firebase.auth();


const SendMoneyScreen = ({navigation, route}) => {
    //
    // const {accountNumb} = route.params;
    // const {currentFirstName} = route.params;
    // const {currentLastName} = route.params;
    //
    //
    // const [recipientFirstName, setRecipientFirstName] = useState('');
    // const [recipientLastName, setRecipientLastName] = useState('');
    //
    // const [rAccountNum, setRAccountNum] = useState(0);
    // const [rUserID, setRUserID] = useState('');
    // const [transferredAmount, setTransferredAmount] = useState(0);
    //
    //
    // const sendButtonHandler = () => {
    //     getRecipientUser().then(rUserID => {
    //             return updateTransactions(rUserID).then(_ => setRUserID(rUserID));
    //         },
    //     );
    // };
    //
    // const updateTransactions = async (rUserID) => {
    //
    //     const currentAccount = db.collection('bankAccounts').doc(accountNumb.toString());
    //     const recipientAccount = db.collection('bankAccounts').doc(rAccountNum.toString());
    //     const recipientTransaction = db.collection('transactions').doc();
    //     const currentTransaction = db.collection('transactions').doc();
    //
    //     try {
    //         db.runTransaction(async t => {
    //             const currentDoc = await t.get(currentAccount);
    //             const newCurrentBalance = currentDoc.data().balance - parseInt(transferredAmount);
    //
    //             if (newCurrentBalance > 0) {
    //                 t.update(currentAccount, {balance: newCurrentBalance});
    //                 t.set(currentTransaction, {
    //                     userID: auth.currentUser.uid,
    //                     amount: transferredAmount,
    //                     transferStatus: 'Sent',
    //                     sentTo: rAccountNum,
    //                     firstName: recipientFirstName,
    //                     lastName: recipientLastName,
    //                     balance: newCurrentBalance,
    //                 });
    //
    //                 const recipientDoc = await t.get(recipientAccount);
    //                 const newRecipientBalance = recipientDoc.data().balance + parseInt(transferredAmount);
    //                 t.update(recipientAccount, {balance: newRecipientBalance});
    //                 t.set(recipientTransaction, {
    //                     userID: rUserID,
    //                     amount: transferredAmount,
    //                     transferStatus: 'Received',
    //                     receivedFrom: accountNumb,
    //                     firstName: currentFirstName,
    //                     lastName: currentLastName,
    //                     balance: newRecipientBalance,
    //                 });
    //
    //             } else {
    //                 alert('Insufficient funds!');
    //             }
    //
    //             alert('Transaction Successful!');
    //         });
    //     } catch (e) {
    //         alert('Transaction Failure', e);
    //     }
    //
    // };
    //
    // const getRecipientUser = () => {
    //     return db.collection('bankAccounts').doc(rAccountNum.toString()).get()
    //         .then(documentSnapshot => {
    //             return documentSnapshot.get('userID');
    //         });
    // };

    // const user = useSelector((state) => ((state.userDataReducer.currentUser)));
    const accNum = useSelector(state => state.userDataReducer.accountNumber);
    const dispatch = useDispatch();


    const [recipientUser, setRecipientUser] = useState({
        firstName: '',
        lastName: '',
        accountNumber: '',
        sendAmount: 0,
        currentAccountNumber: accNum,

    });

    const changeTextInput = (key, value) => {
        setRecipientUser({
            ...recipientUser,
            [key]: value,
        }, []);
    };
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logoImg} source={require('../BankBaseMobile/images/BankBaseLogo.png')}/>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.inputTextContainer}>
                    <TextInput
                        placeholder={'First Name'}
                        style={styles.inputText}
                        onChangeText={text => changeTextInput('firstName', text)}
                    />
                    <TextInput
                        placeholder={'Last Name'}
                        style={styles.inputText}
                        onChangeText={text => changeTextInput('lastName', text)}
                    />
                    <TextInput
                        placeholder={'Account Number'}
                        style={styles.inputText}
                        onChangeText={text => changeTextInput('accountNumber', text)}
                    />
                    <TextInput
                        placeholder={'Amount to Send'}
                        style={styles.inputText}
                        onChangeText={text => changeTextInput('sendAmount', text)}
                    />
                    <TouchableOpacity style={styles.registerButton} onPress={() => {
                        dispatch(getRecipientUserThunk(recipientUser));
                    }}>
                        <Text style={styles.textButton}>Send</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{color: 'white'}}>{}</Text>

            </ScrollView>

            <View style={styles.bottomBarContainer}>
                <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                    <Text style={styles.bottomBarText}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.bottomBarText}>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('LoggedIn')}>
                    <Text style={styles.bottomBarText}>Portal</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#02295F',
    },
    scrollContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    bottomBarText: {
        color: 'white',
        fontSize: 18,
    },
    bottomBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: 10,
    },
    logoImg: {
        width: 425,
        height: 80,
    },
    inputTextContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
    },
    inputText: {
        backgroundColor: 'white',
        width: 250,
        marginLeft: 20,
        borderBottomWidth: 1,
        marginBottom: 7,
    },
    registerButton: {
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        width: 150,
        elevation: 3,
        backgroundColor: 'white',
        borderWidth: 2,
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#02295F',
    },
});

export default SendMoneyScreen;
