/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoggedInScreen from './LoggedIn';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import AccountsScreen from './AccountsScreen';
import SendMoneyScreen from './SendMoneyScreen';
import TestScreen from './TestScreen';
import {Provider} from 'react-redux';
import store from './redux/store/configureStore';


const Stack = createNativeStackNavigator();

function NavContain() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Stack.Screen
                        name="LoggedIn"
                        component={LoggedInScreen}/>
                    <Stack.Screen
                        name="SendMoney"
                        component={SendMoneyScreen}/>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}/>
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}/>
                    <Stack.Screen
                        name="Accounts"
                        component={AccountsScreen}
                    />
                    <Stack.Screen
                        name="Contact"
                        component={TestScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );

}

export default NavContain;
