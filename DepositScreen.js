/* eslint-disable */
import React, {useState} from 'react';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {initiateTransaction} from './redux/slices/transactionSlice';
import {Logo, styles} from './stylesExports';

const DepositScreen = ({navigation}) => {
    const accountNumber = useSelector(state => state.accountsReducer.accountNumber);
    const [checkError, setCheckError] = useState('');
    const [depositError, setDepositError] = useState('');
    const [numberError, setNumberError] = useState('');
    const dispatch = useDispatch();

    const [deposit, setDeposit] = useState({
        checkNumber: 0,
        confirmCheckNumber: 0,
        depositAmount: 0,
        currentAccountNumber: accountNumber,
        transactionType: 'Deposit',
    });

    const confirmInput = () => {
        console.log('test');
        const numbersRegex = /^[0-9]+$/;

        if ((deposit.checkNumber === deposit.confirmCheckNumber) && (deposit.checkNumber.length === 10 && deposit.confirmCheckNumber.length === 10)
            && (numbersRegex.test(deposit.checkNumber) && numbersRegex.test(deposit.confirmCheckNumber))) {
            dispatch(initiateTransaction(deposit));
            alert('Deposit Successful!');
        }

        if (deposit.checkNumber !== deposit.confirmCheckNumber) {
            setCheckError('Check numbers must match!');
        }
        if (deposit.checkNumber.length < 10 || deposit.confirmCheckNumber < 10) {
            setCheckError('Check numbers must have 10 digits!');
        }
        if (!(numbersRegex.test(deposit.checkNumber)) || !(numbersRegex.test(deposit.confirmCheckNumber))) {
            setCheckError('Check numbers must only have digits!');
        }
        if (deposit.depositAmount <= 0) {
            setDepositError('Deposit amount must be greater than 0!');
        }
    };

    const changeTextInput = (key, value) => {
        setDeposit({
            ...deposit,
            [key]: value,
        }, []);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Logo/>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.inputTextContainer}>
                    <TextInput
                        placeholder={'Check Number'}
                        keyboardType={'number-pad'}
                        maxLength={10}
                        style={styles.inputText}
                        onChangeText={text => changeTextInput('checkNumber', text)}
                    />
                    <TextInput
                        placeholder={'Confirm Check Number'}
                        keyboardType={'number-pad'}
                        maxLength={10}
                        style={styles.inputText}
                        onChangeText={text => changeTextInput('confirmCheckNumber', text)}
                    />
                    {!!checkError && (
                        <Text style={{
                            color: 'red',
                            fontSize: 14,
                            marginBottom: 8,
                            fontWeight: 'bold',
                        }}>{checkError}</Text>
                    )}
                    <TextInput
                        placeholder={'Amount to Deposit'}
                        keyboardType={'number-pad'}
                        style={styles.inputText}
                        onChangeText={text => changeTextInput('depositAmount', text)}
                    />
                    {!!depositError && (
                        <Text style={{
                            color: 'red',
                            fontSize: 14,
                            fontWeight: 'bold',
                            marginBottom: 8,
                        }}>{depositError}</Text>
                    )}                 
                    <TouchableOpacity style={styles.submitButton} onPress={() => confirmInput()}>
                        <Text style={styles.textButton}>Deposit</Text>
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

export default DepositScreen;
