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


        // if (numbersRegex.test(deposit.checkNumber && deposit.confirmCheckNumber)) {
        //     alert('all numbers');
        // } else {
        //     alert('letters');
        // }


        // if (deposit.checkNumber === deposit.confirmCheckNumber) {
        //     initiateTransaction(deposit);
        //     alert('Deposit Successful!');
        // } else {
        //     setCheckError('Check Numbers Must Match!');
        // }

        // if ((deposit.checkNumber === deposit.confirmCheckNumber) && (deposit.depositAmount > 0)) {
        //     initiateTransaction(deposit);
        // }
        // if (deposit.checkNumber !== deposit.confirmCheckNumber) {
        //     setCheckError('Check Numbers Must Match!');
        // }

        //     if (deposit.depositAmount <= 0) {
        //         setDepositError('Deposit Amount Must Be Greater Than 0');
        //     }
        //
        //
        // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        // if (passwordRegex.test(deposit.checkNumber)) {
        //     setCheckError('no error');
        // } else {
        //     setCheckError('error');
        // }


    };

    const changeTextInput = (key, value) => {
        setDeposit({
            ...deposit,
            [key]: value,
        }, []);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            {/*<View style={styles.logoContainer}>*/}
            {/*    <Image style={styles.logoImg} source={require('../BankBaseMobile/images/BankBaseLogo.png')}/>*/}
            {/*</View>*/}
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
                    {/*<TouchableOpacity style={styles.depositButton} onPress={() => {*/}
                    {/*    dispatch(initiateTransaction(deposit));*/}
                    {/*}}>*/}

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

// const styles = StyleSheet.create({
//     mainContainer: {
//         flex: 1,
//         backgroundColor: '#02295F',
//     },
//     scrollContainer: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     bottomBarText: {
//         color: 'white',
//         fontSize: 18,
//     },
//     bottomBarContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 10,
//         marginHorizontal: 10,
//     },
//     logoContainer: {
//         maxHeight: '10%',
//     },
//     logoImg: {
//         width: '100%',
//         height: '100%',
//     },
//     inputTextContainer: {
//         flex: 1,
//         alignItems: 'center',
//         marginTop: 30,
//     },
//     inputText: {
//         backgroundColor: 'white',
//         width: '64%',
//         borderBottomWidth: 1,
//         marginBottom: 7,
//     },
//     depositButton: {
//         alignItems: 'center',
//         paddingVertical: 12,
//         paddingHorizontal: 32,
//         borderRadius: 20,
//         width: '40%',
//         elevation: 3,
//         backgroundColor: 'white',
//         borderWidth: 2,
//     },
//     textButton: {
//         fontSize: 16,
//         lineHeight: 21,
//         fontWeight: 'bold',
//         letterSpacing: 0.25,
//         color: '#02295F',
//     },
//     inputValidatorContainer: {
//         backgroundColor: 'gray',
//         minHeight: 150,
//         minWidth: 250,
//
//     },
//
// });

export default DepositScreen;
