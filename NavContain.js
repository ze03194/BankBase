/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoggedInScreen from './LoggedIn';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import AccountsScreen from './AccountsScreen';
import SendMoneyScreen from './SendMoneyScreen';
const Stack = createNativeStackNavigator();

function NavContain() {
    return (
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
                    component={AccountsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );

}

export default NavContain;
