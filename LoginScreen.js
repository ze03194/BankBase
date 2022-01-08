/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {getLogin} from './redux/slices/userDataSlice';

const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const [userCredential, setUserCredential] = useState({});
    const changeTextInput = (key, value) => {
        setUserCredential({
            ...userCredential,
            [key]: value,
        }, []);
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
                        onChangeText={text => changeTextInput('emailAddress', text)}
                    />
                </View>
                <View>
                    <Text style={styles.textOutput}>Password</Text>
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        selectionColor={'white'}
                        onChangeText={text => changeTextInput('password', text)}
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
                <View>
                    <TouchableOpacity style={styles.loginButton} onPress={() => dispatch(getLogin(userCredential))}>
                        <Text style={styles.textButton}>Login</Text>
                    </TouchableOpacity>
                </View>
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

