/* eslint-disable */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {getTransactions} from './redux/slices/accountsSlice';


const TestScreen = ({navigation}) => {

    const transactions = useSelector(state => state.accountsReducer.transactions);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch]);

    function formatMoney(number) {
        return number.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    return (
        <View>
            <Text>{transactions}</Text>
        </View>
        // <View>
        //     <Text>{transactions}</Text>
        // </View>
    );

    // return (
    //     <SafeAreaView style={styles.mainContainer}>
    //         <View style={styles.logoContainer}>
    //             <Image style={styles.logoImg} source={require('../BankBaseMobile/images/BankBaseLogo.png')}/>
    //         </View>
    //
    //         <View style={styles.testing}>
    //             <Text style={styles.accountBalanceText}>{formatMoney(parseInt(500))}</Text>
    //
    //             <View style={styles.testing1}>
    //                 <Text style={{color: 'white', alignSelf: 'center', marginTop: 15}}>Recent Transactions</Text>
    //                 <View style={{
    //                     minWidth: 300,
    //                     maxWidth: 300,
    //                     minHeight: 150,
    //                     maxHeight: 150,
    //                     backgroundColor: 'white',
    //                     marginTop: 15,
    //                     borderLeftWidth: 1,
    //                     borderRightWidth: 1,
    //                     borderBottomWidth: 1,
    //                 }}>
    //
    //                     <FlatList
    //                         data={transactions}
    //                         renderItem={({item}) => (
    //                             <View style={styles.transactionDisplay}>
    //                                 <Text
    //                                     style={styles.transactionText}>{item.transferStatus}: {formatMoney(parseInt(item.amount))}</Text>
    //                                 {/*<Text*/}
    //                                 {/*    style={styles.transactionText}>{getWord(item.transferStatus)}: {item.firstName} {item.lastName} </Text>*/}
    //                                 <Text
    //                                     style={styles.transactionText}>Balance: {formatMoney(parseInt(item.balance))}</Text>
    //                             </View>
    //                         )}/>
    //                 </View>
    //             </View>
    //
    //         </View>
    //
    //         <View style={styles.bottomBarContainer}>
    //             <TouchableOpacity onPress={() => firebase.auth().signOut()}>
    //                 <Text style={styles.bottomBarText}>Log Out</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity onPress={() => navigation.navigate('Home')}>
    //                 <Text style={styles.bottomBarText}>Contact Us</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity onPress={() => navigation.navigate('LoggedIn')}>
    //                 <Text style={styles.bottomBarText}>Portal</Text>
    //             </TouchableOpacity>
    //         </View>
    //     </SafeAreaView>
    // );
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


//     const [recipientUser, setRecipientUser] = useState({
//         firstName: '',
//         lastName: '',
//         accountNumber: '',
//         sendAmount: 0,
//         currentAccountNumber: accNum,
//
//     });
//
//     const changeTextInput = (key, value) => {
//         setRecipientUser({
//             ...recipientUser,
//             [key]: value,
//         }, []);
//     };
//
//     useEffect(() => {
//         dispatch(getUser());
//         dispatch(getAccountNumber());
//     }, [dispatch]);
//
//     return (
//         // <View>
//         //     <Text>{user.firstName}</Text>
//         //     <Text>{accNum}</Text>
//
//
//         <SafeAreaView style={styles.mainContainer}>
//
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <View style={styles.inputTextContainer}>
//                     <TextInput
//                         placeholder={'First Name'}
//                         style={styles.inputText}
//                         onChangeText={text => changeTextInput('firstName', text)}
//                     />
//                     <TextInput
//                         placeholder={'Last Name'}
//                         style={styles.inputText}
//                         onChangeText={text => changeTextInput('lastName', text)}
//                     />
//                     <TextInput
//                         placeholder={'Account Number'}
//                         style={styles.inputText}
//                         onChangeText={text => changeTextInput('accountNumber', text)}
//                     />
//                     <TextInput
//                         placeholder={'Amount to Send'}
//                         style={styles.inputText}
//                         onChangeText={text => changeTextInput('sendAmount', text)}
//                     />
//                     <TouchableOpacity style={styles.registerButton} onPress={() => {
//                         // dispatch(getRecipientUser({recipientUser: recipientUser}));
//                         // dispatch(getRecipientUserThunk(recipientUser));
//                         console.log('hey');
//                     }}>
//                         <Text style={styles.textButton}>Send</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <Text style={{color: 'white'}}>{}</Text>
//
//             </ScrollView>
//         </SafeAreaView>
//
//         // </View>
//
//     );
// };
//
// const styles = StyleSheet.create({
//     mainContainer: {
//         flex: 1,
//         backgroundColor: '#02295F',
//     },
//     scrollContainer: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     bottomBarText: {
//         color: 'white',
//         fontSize: 18,
//     },
//     bottomBarContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 10,
//         marginHorizontal: 10,
//     },
//     logoImg: {
//         width: 425,
//         height: 80,
//     },
//     inputTextContainer: {
//         flex: 1,
//         alignItems: 'center',
//         marginTop: 30,
//     },
//     inputText: {
//         backgroundColor: 'white',
//         width: 250,
//         marginLeft: 20,
//         borderBottomWidth: 1,
//         marginBottom: 7,
//     },
//     registerButton: {
//         alignItems: 'center',
//         paddingVertical: 12,
//         paddingHorizontal: 32,
//         borderRadius: 20,
//         width: 150,
//         elevation: 3,
//         backgroundColor: 'white',
//         borderWidth: 2,
//     },
//     textButton: {
//         fontSize: 16,
//         lineHeight: 21,
//         fontWeight: 'bold',
//         letterSpacing: 0.25,
//         color: '#02295F',
//     },
// });


export default TestScreen;
