/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';

const db = firebase.firestore();
const auth = firebase.auth();

const AccountsScreen = ({navigation, route}) => {
    const {accountNumb} = route.params;
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);

    console.log('acctNumb: ' + accountNumb);

    function formatMoney(number) {
        return number.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }


    useEffect(() => {
        getBalance();
        const transaction = db.collection('transactions').where('userID', '==', auth.currentUser.uid)
            .onSnapshot(querySnapshot => {
                const transactions = [];

                querySnapshot.forEach(documentSnapshot => {
                    transactions.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setTransactions(transactions);
            });
        return () => transactions;
    }, []);


    const getWord = (item) => {
        if (item === 'Sent') {
            return 'Recipient ';
        }
        return 'Sender';
    };

    const getBalance = async () => {
        const balanceRef = db.collection('bankAccounts').doc(accountNumb.toString());

        try {
            await db.runTransaction(async (t) => {
                const doc = await t.get(balanceRef);
                setBalance(doc.data().balance);
            });
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logoImg} source={require('../BankBaseMobile/images/BankBaseLogo.png')}/>
            </View>

            {/*<Text style={styles.welcomeText}>Welcome {user.firstName}</Text>*/}

            {/*<ScrollView contentContainerStyle={styles.scrollContainer}>*/}
            <View style={styles.testing}>
                <Text style={styles.accountBalanceText}>{formatMoney(parseInt(balance))}</Text>

                <View style={styles.testing1}>
                    <Text style={{color: 'white', alignSelf: 'center', marginTop: 15}}>Recent Transactions</Text>
                    <View style={{
                        minWidth: 300,
                        maxWidth: 300,
                        minHeight: 150,
                        maxHeight: 150,
                        backgroundColor: 'white',
                        marginTop: 15,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                    }}>

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
            {/*</ScrollView>*/}

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
    testing: {
        minWidth: 250,
        minHeight: 250,
        backgroundColor: 'white',
        marginTop: 10,
    }, testing1: {
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
    transactionText: {
        color: 'black',
        fontWeight: 'bold',
    },
    accountBalanceText: {
        color: 'black',
        fontWeight: 'bold',
    },


});

export default AccountsScreen;
