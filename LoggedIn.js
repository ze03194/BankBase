/* eslint-disable prettier/prettier,no-trailing-spaces */
import React, {useEffect} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from './redux/slices/userDataSlice';
import {getAccounts, setAccountNumber} from './redux/slices/accountsSlice';

// const db = firebase.firestore();
// const auth = firebase.auth();
// const Stack = createNativeStackNavigator();

const LoggedInScreen = ({navigation}) => {
    const user = useSelector(state => state.userDataReducer.currentUser);
    const accounts = useSelector(state => state.accountsReducer.accounts);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log('accountNum: ' + accountNumber);
        dispatch(getUser());
        dispatch(getAccounts());
    }, [dispatch]);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logoImg} source={require('../BankBaseMobile/images/BankBaseLogo.png')}/>
            </View>

            <Text style={styles.welcomeText}>Welcome, {user.firstName}!</Text>

            <View style={styles.accountBoxContainer}>
                <View style={styles.accountsDisplayContainer}>
                    <Text style={{color: 'white', alignSelf: 'center', marginVertical: 15}}>Accounts</Text>
                    <View style={styles.accountsFlatList}>
                        <FlatList
                            data={accounts}
                            renderItem={({item}) => (
                                <View style={styles.accountsDisplay}>
                                    {/*<TouchableOpacity onPress={() => {*/}
                                    {/*    navigation.navigate('Accounts', {*/}
                                    {/*        accountNum: item.accountNumber,*/}
                                    {/*    });*/}
                                    {/*}}>*/}
                                    <TouchableOpacity onPress={() => {
                                        const accountNum = item.accountNumber;
                                        dispatch(setAccountNumber({accountNum}));
                                        navigation.navigate('Accounts');
                                    }}>
                                        <View style={styles.accountsTextContainer}>
                                            <Text
                                                style={styles.accountsText}>...{item.accountNumber.toString().substring(4)} - {item.accountType}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}/>
                    </View>
                    {/*</View>*/}
                </View>
            </View>
            <View style={styles.bottomNavBar}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NewAccount')}>
                    <Text style={{color: 'white', fontSize: 18}}>Open New Account</Text>
                </TouchableOpacity>
            </View>
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
    accountsDisplayContainer: {
        minWidth: 300,
        maxWidth: 300,
        minHeight: 50,
        marginTop: 20,
        backgroundColor: '#02295F',
        alignSelf: 'center',
        borderWidth: 1,
    },
    accountsListBox: {
        minWidth: 300,
        maxWidth: 300,
        minHeight: 250,
        maxHeight: 250,
        backgroundColor: 'white',
        marginTop: 15,
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        // borderBottomWidth: 1,
    },
    bottomNavBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    accountsDisplay: {
        flex: 1,
        borderTopWidth: 1.5,
        // minHeight: 75,
        // maxHeight: 80,
    },
    accountsFlatList: {
        // minWidth: 300,
        // maxWidth: 300,
        maxHeight: 250,
        backgroundColor: 'white',
        // borderWidth: 1,
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        // borderBottomWidth: 1,
    },
    accountsText: {
        color: 'black',
        fontWeight: 'bold',
    },
    accountsTextContainer: {
        minHeight: 60,
    },


});
export default LoggedInScreen;
