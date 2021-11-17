/* eslint-disable prettier/prettier,no-trailing-spaces */
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';

const db = firebase.firestore();
const auth = firebase.auth();
// const Stack = createNativeStackNavigator();

const LoggedInScreen = ({navigation}) => {
    const [accountNumb, setAccountNumb] = useState(123456789);
    const [user, setUser] = useState({
        emailAddress: '',
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        accountNumber: 12345678901,
    });

    useEffect(() => {
        getUsers();
        return () => {
            setUser({});
        };
    }, []);

    const getUsers = () => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
            .then(documentSnapshot => {
                setUser({
                    firstName: documentSnapshot.get('firstName'),
                    lastName: documentSnapshot.get('lastName'),
                    address1: documentSnapshot.get('address1'),
                    address2: documentSnapshot.get('address2'),
                    city: documentSnapshot.get('city'),
                    state: documentSnapshot.get('state'),
                    zipCode: documentSnapshot.get('zipCode'),
                    emailAddress: documentSnapshot.get('emailAddress'),
                    // accountNumber: documentSnapshot.get('accountNumber'),
                    accountNumber: firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                        .collection('bankAccounts').where('userID', '==', firebase.auth().currentUser.uid)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(documentSnapshot => {
                                setAccountNumb(documentSnapshot.get('accountNumber'));
                            });
                        }),
                });

            })
            .catch((error => {
                console.log(error);
            }));
    };
    console.log('acct#1: ', accountNumb);

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
            </View>
            <Text style={styles.welcomeText}>Welcome {user.firstName}</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.accountBoxContainer}>
                    <View style={styles.topBoxContainer}>
                        <Text style={{color: 'white', alignSelf: 'center', marginTop: 15}}>Accounts</Text>
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
                            <ScrollView>
                                <TouchableOpacity onPress={() => navigation.navigate('Accounts')}>
                                    <Text>...{accountNumb.toString().substring(4)}</Text>
                                </TouchableOpacity>
                            </ScrollView>

                        </View>
                    </View>
                </View>
                <View style={styles.bottomNavBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('SendMoney')}>
                        <Text style={{color: 'white'}}>Send Money</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SendMoney')}>
                        <Text style={{color: 'white'}}>Request Money</Text>
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
    accountBoxContainer: {
        minWidth: 250,
        minHeight: 250,
        backgroundColor: 'white',
        marginTop: 10,
    },
    topBoxContainer: {
        minWidth: 300,
        maxWidth: 300,
        minHeight: 50,
        marginTop: 20,
        backgroundColor: '#02295F',
        alignSelf: 'center',
    },
    bottomNavBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },


});
export default LoggedInScreen;
