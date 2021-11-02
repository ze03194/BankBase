/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const userCredential = [];

const LoginScreen = ({navigation}) => {
    const [emailAddress, setEmailAddress] = useState('');
    const [userPw, setUserPw] = useState('');

    const loginButtonHandler = () => {
        const user = {
            'emailAddress': emailAddress,
            'userPw': userPw,
        };
        userCredential.push(user);

        firebase.auth().signInWithEmailAndPassword(user.emailAddress, user.userPw)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });

    };

    return (
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.topBrandName}>BankBase</Text>
            </View>
            <View style={styles.loginBox}>
                <View>
                    <Text style={styles.textOutput}>Email Address</Text>
                    <TextInput
                        style={styles.textInput}
                        selectionColor={'white'}
                        onChangeText={eAddress => setEmailAddress(eAddress)}
                    />
                </View>
                <View>
                    <Text style={styles.textOutput}>Password</Text>
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        selectionColor={'white'}
                        onChangeText={uPw => setUserPw(uPw)}
                    />
                </View>
                <View style={styles.promptContainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Register');
                    }}>
                        <Text style={styles.promptText}>Register</Text>
                    </TouchableOpacity>
                    <Text style={styles.promptText}>Forgot Password</Text>
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={loginButtonHandler}>
                    <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 3,
        backgroundColor: '#02295F',
    },
    loginBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        // backgroundColor: 'white',
        color: 'white',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        width: 250,
        borderRadius: 10,
        marginBottom: 20,
    },
    textOutput: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'white',
    },
    topBrandName: {
        fontSize: 25,
        color: 'white',
        marginTop: 20,
        marginLeft: 20,
    },
    loginButton: {
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        width: 150,
        elevation: 3,
        backgroundColor: 'white',
        borderWidth: 2,
        top: 200,
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
    promptContainer: {
        flexDirection: 'row',

    },
    promptText: {
        color: 'white',
        marginTop: 10,
        marginHorizontal: 20,

    },


});

export default LoginScreen;

