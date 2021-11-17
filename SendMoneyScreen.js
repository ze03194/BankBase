/* eslint-disable */
import React, {useEffect, useState} from 'react';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';


const SendMoneyScreen = ({navigation}) => {
    const [transferAccount, setTransferAccount] = useState({
        firstName: '',
        lastName: '',
        accountNumber: 0,
        amountSent: 0
    });

    useEffect(() => {
        getAcctInfo();
        return () => {
            setTransferAccount({});
        };
    }, []);

    const getAcctInfo = () => {
        // firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        //     .collection('bankAccounts').where('userID', '==', firebase.auth().currentUser.uid)
        //     .get()
        //     .then(querySnapshot => {
        //         querySnapshot.forEach(documentSnapshot => {
        //             setTransferAccount({
        //                 accountNumber: documentSnapshot.get('accountNumber'),
        //                 balance: documentSnapshot.get('balance'),
        //             });
        //         });
        //     });
        firebase.firestore().collection('users').get()
            .then(querySnapshot => {
                
            })
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
                    />
                    <TextInput
                        placeholder={'Amount to Send'}
                        style={styles.inputText}
                    />
                    <TouchableOpacity style={styles.registerButton}>
                        <Text style={styles.textButton}>Send</Text>
                    </TouchableOpacity>
                </View>

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
