/* eslint-disable */
import React, {useState} from 'react';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const db = firebase.firestore().collection('users');
const auth = firebase.auth().currentUser.uid;


const SendMoneyScreen = ({navigation, route}) => {

    const accountN = route.params;

    // const [cNewBalance, setCNewBalance] = useState(0);
    // const [rNewBalance, setRNewBalance] = useState(0);
    //
    //
    // const [cUserBalance, setCUserBalance] = useState(0);
    // const [rUserBalance, setRUserBalance] = useState(0);

    const [recipientFirstName, setRecipientFirstName] = useState('');
    const [recipientLastName, setRecipientLastName] = useState('');
    // const [currentFirstName, setCurrentFirstName] = useState('');
    // const [currentLastName, setCurrentLastName] = useState('');
    const [rAccountNum, setRAccountNum] = useState(0);
    const [rUserID, setRUserID] = useState('');
    const [transferredAmount, setTransferredAmount] = useState(0);

    // firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('bankAccounts').doc(accountN.toString()).get()
    //     .then(documentSnapshot => {
    //         setCUserBalance(documentSnapshot.get('balance'));
    //     });

    const sendButtonHandler = () => {
        getRecipientUser().then(rUserID => {
                updateUsers();
                return updateTransactions(rUserID).then(_ => setRUserID(rUserID));
            },
        );
    };

    const updateUsers = () => {
        const db = firebase.firestore();
        const currentAccount = firebase.firestore().collection('bankAccounts').doc(accountN.toString());
        const recipientAccount = firebase.firestore().collection('bankAccounts').doc(rAccountNum.toString());

        try {
            db.runTransaction(async t => {
                const currentDoc = await t.get(currentAccount);
                const newCurrentBalance = currentDoc.data().balance - parseInt(transferredAmount);
                if (newCurrentBalance > 0) {
                    t.update(currentAccount, {balance: newCurrentBalance});
                } else {
                    alert('Insufficient funds!');
                }
                const recipientDoc = await t.get(recipientAccount);
                const newRecipientBalance = recipientDoc.data().balance + parseInt(transferredAmount);
                t.update(recipientAccount, {balance: newRecipientBalance});

                alert('Transaction Successful!');
            });
        } catch (e) {
            alert('Transaction Failure', e);
        }
    };

    const updateTransactions = async (rUserID, currentFirstName, currentLastName) => {
        const batch = firebase.firestore().batch();
        const db = firebase.firestore();
        const currentUser = db.collection('users').doc(firebase.auth().currentUser.uid);


        db.runTransaction(async t => {
            const currentDoc = await t.get(currentUser);

            const currentFirstName = currentDoc.data().firstName;
            const currentLastName = currentDoc.data().lastName;
            // setCurrentFirstName(currentDoc.data().firstName);
            // setCurrentLastName(currentDoc.data().lastName);
            console.log('firstName: ' + currentFirstName);

        });

        const recipientTransaction = firebase.firestore().collection('transactions').doc();
        const currentTransaction = firebase.firestore().collection('transactions').doc();

        batch.set(recipientTransaction, {
            userID: rUserID,
            amount: transferredAmount,
            transferStatus: 'Received',
            receivedFrom: accountN,
            // firstName: currentFirstName,
            // lastName: currentLastName,
        });

        batch.set(currentTransaction, {
            userID: firebase.auth().currentUser.uid,
            amount: transferredAmount,
            transferStatus: 'Sent',
            sentTo: rAccountNum,
            firstName: recipientFirstName,
            lastName: recipientLastName,
        });

        await batch.commit();


    };

    const getRecipientUser = () => {
        return firebase.firestore().collection('bankAccounts').doc(rAccountNum.toString()).get()
            .then(documentSnapshot => {
                return documentSnapshot.get('userID');
            });

    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logoImg} source={require('../BankBaseMobile/images/BankBaseLogo.png')}/>
            </View>
            <View style={styles.topBarContainer}>
                <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                    <Text style={styles.topBarText}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.topBarText}>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('LoggedIn')}>
                    <Text style={styles.topBarText}>Portal</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.inputTextContainer}>
                    <TextInput
                        placeholder={'First Name'}
                        style={styles.inputText}
                        onChangeText={text => setRecipientFirstName(text)}
                    />
                    <TextInput
                        placeholder={'Last Name'}
                        style={styles.inputText}
                        onChangeText={text => setRecipientLastName(text)}
                    />
                    <TextInput
                        placeholder={'Account Number'}
                        style={styles.inputText}
                        onChangeText={text => setRAccountNum(text)}
                    />
                    <TextInput
                        placeholder={'Amount to Send'}
                        style={styles.inputText}
                        onChangeText={text => setTransferredAmount(text)}
                    />
                    <TouchableOpacity style={styles.registerButton} onPress={sendButtonHandler}>
                        <Text style={styles.textButton}>Send</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{color: 'white'}}>{}</Text>

            </ScrollView>
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
    topBarText: {
        color: 'white',
        fontSize: 18,
    },
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
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
