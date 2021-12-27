/* eslint-disable */
import React, {useEffect} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {useDispatch, useSelector} from 'react-redux';
import {getTransactions} from './redux/slices/accountsSlice';
import {getBalance} from './redux/slices/userDataSlice';


const AccountsScreen = ({navigation}) => {

    const transactions = useSelector(state => state.accountsReducer.transactions);
    const currentBalance = useSelector(state => state.userDataReducer.balance);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransactions());
        dispatch(getBalance());
    }, [dispatch]);

    function formatMoney(number) {
        return number.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    const getWord = (item) => {
        if (item === 'Sent') {
            return 'Recipient ';
        }
        return 'Sender';
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logoImg} source={require('../BankBaseMobile/images/BankBaseLogo.png')}/>
            </View>

            <View style={styles.transactionsContainer}>
                <Text style={styles.accountBalanceText}>Balance: {formatMoney(parseInt(currentBalance))}</Text>
                <View style={styles.topTransactionBox}>
                    <Text style={{color: 'white', alignSelf: 'center', marginTop: 15}}>Recent Transactions</Text>
                    <View style={styles.transactionFlatList}>
                        <FlatList
                            data={transactions}
                            renderItem={({item}) => (
                                <View style={styles.transactionDisplay}>
                                    <Text
                                        style={styles.transactionText}>{item.transferStatus}: {formatMoney(parseInt(item.amount))}</Text>
                                    <Text
                                        style={styles.transactionText}>{getWord(item.transferStatus)}: {item.firstName} {item.lastName} </Text>
                                    <Text
                                        style={styles.transactionText}>Balance: {formatMoney(parseInt(item.balance))}</Text>
                                </View>
                            )}/>
                    </View>
                </View>
            </View>

            <View style={styles.bottomBarContainer}>
                <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                    <Text style={styles.bottomBarText}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.bottomBarText}>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('LoggedIn')}>
                    <Text style={styles.bottomBarText}>Portal</Text>
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
        marginLeft: 15,
        fontSize: 25,
    },
    bottomBarText: {
        color: 'white',
        fontSize: 18,
    },
    bottomBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 380,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    logoImg: {
        width: 425,
        height: 80,
    },
    transactionsContainer: {
        minWidth: 250,
        minHeight: 250,
        backgroundColor: 'white',
        marginTop: 10,
    }, topTransactionBox: {
        minWidth: 300,
        maxWidth: 300,
        minHeight: 50,
        marginTop: 20,
        backgroundColor: '#02295F',
        alignSelf: 'center',
    },
    transactionDisplay: {
        flex: 1,
        borderTopWidth: 1.5,
        minHeight: 75,
        maxHeight: 80,
    },
    transactionFlatList: {
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
    transactionText: {
        color: 'black',
        fontWeight: 'bold',
    },
    accountBalanceText: {
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 5,
    },
});

export default AccountsScreen;
