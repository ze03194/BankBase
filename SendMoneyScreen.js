/* eslint-disable */
import React, {useState} from 'react';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {initiateTransaction} from './redux/slices/transactionSlice';
import {Logo, styles} from './stylesExports';

const db = firebase.firestore();

const SendMoneyScreen = ({navigation, route}) => {
    const {accountNum} = route.params;
    const dispatch = useDispatch();

    const [transaction, setTransaction] = useState({
        firstName: '',
        lastName: '',
        accountNumber: '',
        sendAmount: 0,
        currentAccountNumber: accountNum,
        transactionType: 'Sent',

    });


    const validateAccount = () => {
        const docRef = db.collection('bankAccounts').doc(transaction.accountNumber.toString());
        docRef.get()
            .then(doc => {
                if (doc.exists) {
                    dispatch(initiateTransaction(transaction));
                } else {
                    alert('Account number does not exist!');
                }
            })
            .catch(() => {
                alert('Account number does not exist!');
            });

    };

    const changeTextInput = (key, value) => {
        setTransaction({
            ...transaction,
            [key]: value,
        }, []);
    };
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Logo/>
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
                    <TouchableOpacity style={styles.submitButton} onPress={() => validateAccount()}>
                        <Text style={styles.textButton}>Send</Text>
                    </TouchableOpacity>
                </View>
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
export default SendMoneyScreen;
