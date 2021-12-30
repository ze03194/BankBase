/* eslint-disable */
import React, {useEffect, useState} from 'react';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {initiateTransactionThunk} from './redux/slices/transactionSlice';

const DepositScreen = ({navigation}) => {
    // const {accountNum} = route.params;
    const testing = useSelector(state => state.accountsReducer.accountNumber);
    const dispatch = useDispatch();

    const [recipientUser, setRecipientUser] = useState({
        firstName: '',
        lastName: '',
        accountNumber: '',
        sendAmount: 0,
        // currentAccountNumber: accountNum,

    });

    useEffect(() => {
        console.log('depscreen: ' + testing);
    });

    // useEffect(() => {
    //     let testing = dispatch(getAccountNumber());
    //     console.log('sendMonAcc: ' + testing);
    // });

    // useEffect(() => {
    //     console.log('sendMon Acc: ' + getAccountNumber());
    // }, [dispatch()]);

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
                    <TouchableOpacity style={styles.sendButton} onPress={() => {
                        dispatch(initiateTransactionThunk(recipientUser));
                    }}>
                        <Text style={styles.textButton}>Send</Text>
                    </TouchableOpacity>
                </View>
                {/*<Text style={{color: 'white'}}>{}</Text>*/}

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
    sendButton: {
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

export default DepositScreen;
