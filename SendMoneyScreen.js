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
    const [cNewBalance, setCNewBalance] = useState(0);
    const [rNewBalance, setRNewBalance] = useState(0);


    const [cUserBalance, setCUserBalance] = useState(0);
    const [rUserBalance, setRUserBalance] = useState(0);

    const [rAccountNum, setRAccountNum] = useState(0);
    const [rUserID, setRUserID] = useState('');
    const [transferredAmount, setTransferredAmount] = useState(0);


    // useEffect(() => {
    //     getAcctInfo();
    //     return () => {
    //         setTransferAccount({});
    //     };
    // }, []);
    //
    // const getAcctInfo = () => {
    //     firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
    //         .collection('bankAccounts').where('userID', '==', firebase.auth().currentUser.uid)
    //         .get()
    //         .then(querySnapshot => {
    //             querySnapshot.forEach(documentSnapshot => {
    //                 setTransferAccount({
    //                     accountNumber: documentSnapshot.get('accountNumber'),
    //                     balance: documentSnapshot.get('balance'),
    //                 });
    //             });
    //         });
    //     firebase.firestore().collection('users').get()
    //         .then(querySnapshot => {
    //
    //         })
    // };

    // useEffect(() => {
    //     return () => {
    //         setCurrentUser({});
    //         setRecipientUser({});
    //     };
    // }, []);

    // const sendButtonHandler = () => {
    //     firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('bankAccounts').doc(accountN.toString()).get()
    //         .then(documentSnapshot => {
    //             setCurrentUser({
    //                 balance: documentSnapshot.get('balance'),
    //             });
    //         });
    //
    //
    //     firebase.firestore().collection('users').get()
    //         .then(querySnapshot => {
    //             querySnapshot.forEach(documentSnapshot => {
    //                 firebase.firestore().collection('users').doc(documentSnapshot.id).collection('bankAccounts').doc(rAccount).get()
    //                     .then(documentSnapshot => {
    //                         if (documentSnapshot.get('userID') !== undefined) {
    //                             setRecipientUser({
    //                                 userID: documentSnapshot.get('userID'),
    //                                 balance: documentSnapshot.get('balance'),
    //                             });
    //                         }
    //                         newBalance = recipientUser.balance - 200;
    //                         console.log('test1: ' + recipientUser.balance);
    //                         console.log('newBalance: ' + newBalance);
    //
    //                     });
    //             });
    //         });
    //
    //     firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('bankAccounts').doc(accountN.toString())
    //         .update({
    //             balance: currentUser.balance - currentUser.amountSent,
    //         })
    //         .then(() => {
    //             console.log('successful update');
    //         });
    //     console.log('test2: ' + rAccount);
    //     // firebase.firestore().collection('users').doc(recipientUser.userID).collection('bankAccounts').doc(recipientUser.accountNumber)
    //     //     .update({
    //     //         balance: recipientUser.balance + recipientUser.amountReceived,
    //     //     })
    //     //     .then(() => {
    //     //         console.log('successful update');
    //     //     });
    //
    //
    // };

    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('bankAccounts').doc(accountN.toString()).get()
        .then(documentSnapshot => {
            setCUserBalance(documentSnapshot.get('balance'));
        });

    const sendButtonHandler = () => {
        getRecipientUser();
        updateUsers();
        updateTransactions();

    };

    const updateUsers = () => {
        console.log('ridFromUpdateUsers: ' + rUserID);
        if ((cUserBalance - parseInt(transferredAmount)) > 0) {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('bankAccounts').doc(accountN.toString())
                .update({
                    balance: cUserBalance - parseInt(transferredAmount),
                })
                .then(() => {
                    console.log('Successful update!');
                });
        } else {
            alert('Insufficient funds!');
        }
        firebase.firestore().collection('users').doc(rUserID.toString()).collection('bankAccounts').doc(rAccountNum.toString())
            .update({
                balance: rUserBalance + parseInt(transferredAmount),
            })
            .then(() => {
                console.log('Successful update!');
            });
    };

    const updateTransactions = () => {
        console.log('ridFromTrans: ' + rUserID);
        if (rUserID !== undefined) {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('bankAccounts').doc(accountN.toString())
                .collection('transactions').add({
                userID: firebase.auth().currentUser.uid,
                accountNumber: accountN,
                transferStatus: 'Sent',
                amount: transferredAmount,
            })
                .then(() => {
                    console.log('Transaction Updated!');
                });
        }

        if (rUserID !== undefined) {
            firebase.firestore().collection('users').doc(rUserID.toString()).collection('bankAccounts').doc(rAccountNum.toString())
                .collection('transactions').add({
                userID: rUserID,
                accountNumber: rAccountNum,
                transferStatus: 'Received',
                amount: transferredAmount,
            })
                .then(() => {
                    console.log('Transaction Updated!');
                });

        }
    };

    const getRecipientUser = () => {
        firebase.firestore().collection('users').get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    firebase.firestore().collection('users').doc(documentSnapshot.id).collection('bankAccounts').doc(rAccountNum.toString()).get()
                        .then(documentSnapshot => {
                            if (documentSnapshot.get('userID') !== undefined) {
                                setRUserID(documentSnapshot.get('userID'));
                                setRUserBalance(documentSnapshot.get('balance'));
                            }
                        });
                });
            });
        console.log('ridFromRecipUser: ' + rUserID);
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
                    />
                    <TextInput
                        placeholder={'Last Name'}
                        style={styles.inputText}
                    />
                    <TextInput
                        placeholder={'Account Number'}
                        style={styles.inputText}
                        value={rAccountNum}
                        onChangeText={text => setRAccountNum(text)}
                    />
                    <TextInput
                        placeholder={'Amount to Send'}
                        style={styles.inputText}
                        value={transferredAmount}
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
