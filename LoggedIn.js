/* eslint-disable prettier/prettier,no-trailing-spaces */
import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {useDispatch, useSelector} from 'react-redux';
import {getAccountNumber, getUser} from './redux/slices/userDataSlice';

const db = firebase.firestore();
const auth = firebase.auth();
// const Stack = createNativeStackNavigator();

const LoggedInScreen = ({navigation}) => {
    const user = useSelector(state => state.userDataReducer.currentUser);
    const accountNumber = useSelector(state => state.userDataReducer.accountNumber);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
        dispatch(getAccountNumber());

    }, [dispatch]);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logoImg} source={require('../BankBaseMobile/images/BankBaseLogo.png')}/>
            </View>

            <Text style={styles.welcomeText}>Welcome, {user.firstName}!</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.accountBoxContainer}>
                    <View style={styles.topBoxContainer}>
                        <Text style={{color: 'white', alignSelf: 'center', marginTop: 15}}>Accounts</Text>
                        <View style={styles.accountsListBox}>
                            <ScrollView>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Accounts', {accountNumb: accountNumber})}>
                                    <Text>...{accountNumber.toString().substring(4)}</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomNavBar}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SendMoney')}>
                        <Text style={{color: 'white'}}>Send Money</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.bottomBarContainer}>
                <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                    <Text style={styles.bottomBarText}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                    <Text style={styles.bottomBarText}>Contact Us</Text>
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
    scrollContainer: {},
    welcomeText: {
        color: 'white',
        marginTop: 20,
        marginLeft: 10,
        fontSize: 25,
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
    accountsListBox: {
        minWidth: 300,
        maxWidth: 300,
        minHeight: 150,
        maxHeight: 150,
        backgroundColor: 'white',
        marginTop: 15,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    bottomNavBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },


});
export default LoggedInScreen;
