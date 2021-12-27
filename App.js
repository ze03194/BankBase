/* eslint-disable prettier/prettier,no-trailing-spaces */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {initializeApp} from 'firebase/app';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import AccountsScreen from './AccountsScreen';
import NavContain from './NavContain';
import TestScreen from './TestScreen';
import {Provider} from 'react-redux';
import store from './redux/store/configureStore';

const firebaseConfig = {
    apiKey: 'AIzaSyBKyuWBMtiWMKi29brFRH3R062W5_1ePv4',
    authDomain: 'bankbasemobile-8f88e.firebaseapp.com',
    projectId: 'bankbasemobile-8f88e',
    storageBucket: 'bankbasemobile-8f88e.appspot.com',
    messagingSenderId: '1735631735',
    appId: '1:1735631735:web:fd34ab8eeb1b89073c3772',
};

const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const App = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) {
            setInitializing(false);
        }
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    });

    if (initializing) {
        return null;
    }

    if (!user) {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}/>
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}/>
                        <Stack.Screen
                            name="Accounts"
                            component={AccountsScreen}/>
                        <Stack.Screen
                            name={'Contact'}
                            component={TestScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }

    return (
        <NavContain/>
    );
};

export default App;
