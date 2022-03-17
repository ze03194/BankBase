/* eslint-disable */
import React, {useEffect} from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {useDispatch, useSelector} from 'react-redux';
import {getTransactions} from './redux/slices/accountsSlice';
import {getBalance} from './redux/slices/userDataSlice';
import {Logo, styles} from './stylesExports';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const AccountsScreen = ({navigation, route}) => {

   
    const transactions = useSelector(state => state.accountsReducer.transactions);
    const currentBalance = useSelector(state => state.userDataReducer.balance);
    const accountNum = useSelector(state => state.accountsReducer.accountNumber);
    const dispatch = useDispatch();


    useEffect(() => {
        console.log('accScreen: ' + accountNum);
        dispatch(getTransactions(accountNum));
        dispatch(getBalance(accountNum));
        // dispatch(setAccountNumber({accountNum}));
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

            <Logo/>
            <View style={styles.flatListContainer}>
                <Text style={styles.accountBalanceText}>Balance: {formatMoney(parseInt(currentBalance))}</Text>
                <View style={styles.topFlatList}>
                    <Text style={{color: 'white', alignSelf: 'center', marginVertical: 15}}>Recent Transactions</Text>
                    <View style={styles.flatListBackground}>
                        <FlatList
                            data={transactions}
                            renderItem={({item}) => (
                                <View style={styles.flatListDisplay}>
                                    <Text
                                        style={styles.flatListText}>{item.transactionStatus}: {formatMoney(parseInt(item.amount))}</Text>
                                    <Text
                                        style={styles.flatListText}>{getWord(item.transactionStatus)}: {item.firstName} {item.lastName} </Text>
                                    <Text
                                        style={styles.flatListText}>Balance: {formatMoney(parseInt(item.balance))}</Text>
                                </View>
                            )}/>
                    </View>
                </View>
            </View>
            <View style={styles.accountOptionsContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('SendMoney', {
                            accountNum: accountNum,
                        });
                    }}>
                    <Text style={styles.optionsText}>Send Money</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Deposit')}>
                    <Text style={styles.optionsText}>Deposit</Text>
                </TouchableOpacity>
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
export default AccountsScreen;
