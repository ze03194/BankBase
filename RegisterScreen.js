/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import 'intl';
import 'intl/locale-data/jsonp/en-US';
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';


const db = firebase.firestore();
const auth = firebase.auth();
const RegisterScreen = (props) => {
        const accNum = Math.floor(10000000 + Math.random() * 99999999);

        const [registration, setRegistration] = useState({
            password: '',
            emailAddress: '',
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipCode: '',
            securityPin: '',
            balance: Math.floor(10000 + Math.random() * 99999),
            // balance: formatMoney(Math.floor(10000 + Math.random() * 99999)),
        });

        const changeTextInput = (key, value) => {
            setRegistration({
                ...registration,
                [key]: value,
            }, []);
        };
        const registerButtonHandler = () => {
            firebase.auth().createUserWithEmailAndPassword(registration.emailAddress, registration.password)
                .then(() => {
                    firebase.firestore().collection('users')
                        .doc(firebase.auth().currentUser.uid)
                        .set({
                            firstName: registration.firstName,
                            lastName: registration.lastName,
                            emailAddress: registration.emailAddress,
                            address1: registration.address1,
                            address2: registration.address2,
                            city: registration.city,
                            state: registration.state,
                            zipCode: registration.zipCode,
                        })
                        .then(() => {
                            firebase.firestore().collection('bankAccounts').doc(accNum.toString()).set({
                                userID: firebase.auth().currentUser.uid,
                                balance: registration.balance,
                                accountNumber: accNum,
                            })
                                .then((result) => {
                                    console.log(result);
                                });
                        });
                    // .then(() => {
                    //     firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('bankAccounts').doc(accNum.toString())
                    //         .collection('transactions').add({
                    //         userID: firebase.auth().currentUser.uid,
                    //         accountNumber: accNum,
                    //         transferStatus: ' ',
                    //         amount: ' ',
                    //     });
                    // });
                })
                .catch(error => {
                    console.log(error);
                });
        };
        return (
            <SafeAreaView style={styles.registerContainer}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logoImg} source={require('../BankBaseMobile/images/BankBaseLogo.png')}/>
                </View>
                <Text style={{color: 'white', fontSize: 15, marginTop: 20, alignSelf: 'center'}}>Registration Form</Text>
                <ScrollView contentContainerStyle={styles.inputTextContainer}>
                    <TextInput
                        placeholder="Email Address"
                        style={styles.inputText}
                        value={registration.emailAddress}
                        onChangeText={text => changeTextInput('emailAddress', text)}
                    />
                    <TextInput
                        placeholder="Password"
                        style={styles.inputText}
                        value={registration.password}
                        secureTextEntry={true}
                        onChangeText={text => changeTextInput('password', text)}
                    />
                    <TextInput
                        placeholder="First Name"
                        style={styles.inputText}
                        value={registration.firstName}
                        onChangeText={text => changeTextInput('firstName', text)}
                    />
                    <TextInput
                        placeholder="Last Name"
                        style={styles.inputText}
                        value={registration.lastName}
                        onChangeText={text => changeTextInput('lastName', text)}
                    />
                    <TextInput
                        placeholder="Address1"
                        style={styles.inputText}
                        value={registration.address1}
                        onChangeText={text => changeTextInput('address1', text)}
                    />
                    <TextInput
                        placeholder="Address2"
                        style={styles.inputText}
                        value={registration.address2}
                        onChangeText={text => changeTextInput('address2', text)}
                    />
                    <TextInput
                        placeholder="City"
                        style={styles.inputText}
                        value={registration.city}
                        onChangeText={text => changeTextInput('city', text)}
                    />
                    <TextInput
                        placeholder="State"
                        style={styles.inputText}
                        value={registration.state}
                        onChangeText={text => changeTextInput('state', text)}
                    />
                    <TextInput
                        placeholder="Zipcode"
                        style={styles.inputText}
                        value={registration.zipCode}
                        onChangeText={text => changeTextInput('zipCode', text)}
                    />
                    <TextInput
                        placeholder="Security Pin"
                        style={styles.inputText}
                        value={registration.securityPin}
                        secureTextEntry={true}
                        onChangeText={text => changeTextInput('securityPin', text)}
                    />
                    <TouchableOpacity style={styles.registerButton} onPress={registerButtonHandler}>
                        <Text style={styles.textButton}>Register</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }
;

const styles = StyleSheet.create({
    registerContainer: {
        flex: 1,
        backgroundColor: '#02295F',
    },
    logoImg: {
        width: 425,
        height: 80,
    },
    inputText: {
        backgroundColor: 'white',
        width: 250,
        marginLeft: 20,
        borderBottomWidth: 1,
        marginBottom: 7,

    },
    inputTextContainer: {
        alignItems: 'center',
        marginTop: 15,
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

export default RegisterScreen;

