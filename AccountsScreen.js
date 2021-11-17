/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';

const db = firebase.firestore();
const auth = firebase.auth();

const AccountsScreen = ({navigation}, user) => {
    const [userAccount, setUserAccount] = useState({
        accountNumber: 123,
        balance: 0,
    });

    useEffect(() => {
        getAcctInfo();
        return () => {
            setUserAccount({});
        };
    }, []);

    const getAcctInfo = () => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .collection('bankAccounts').where('userID', '==', firebase.auth().currentUser.uid)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    setUserAccount({
                        accountNumber: documentSnapshot.get('accountNumber'),
                        balance: documentSnapshot.get('balance'),
                    });
                });
            });
    };


    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logoImg} source={require('../BankBaseMobile/images/BankBaseLogo.png')}/>
            </View>
            <View style={styles.topBarContainer}>
                {/*<TouchableOpacity onPress={() => navigation.navigate('Home')}>*/}
                {/*    <Text style={styles.topBarText}>Home</Text>*/}
                {/*</TouchableOpacity>*/}
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
            {/*<Text style={styles.welcomeText}>Welcome {user.firstName}</Text>*/}

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.testing}>
                    <View style={styles.testing1}>
                        <Text style={{color: 'white', alignSelf: 'center', marginTop: 15}}>Recent Transactions</Text>
                        <View style={{
                            minWidth: 300,
                            maxWidth: 300,
                            minHeight: 150,
                            maxHeight: 150,
                            backgroundColor: 'white',
                            marginTop: 15,
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                        }}>
                            <TouchableOpacity>
                                <Text>...{userAccount.accountNumber.toString().substring(4, 9)}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    scrollContainer: {},
    welcomeText: {
        color: 'white',
        marginTop: 20,
        marginLeft: 15,
        fontSize: 25,
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
    testing: {
        minWidth: 250,
        minHeight: 250,
        backgroundColor: 'white',
        marginTop: 10,
    }, testing1: {
        minWidth: 300,
        maxWidth: 300,
        minHeight: 50,
        marginTop: 20,
        backgroundColor: '#02295F',
        alignSelf: 'center',
    },
});

export default AccountsScreen;
