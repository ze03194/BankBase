/* eslint-disable prettier/prettier,no-trailing-spaces */
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';

const db = firebase.firestore();
const auth = firebase.auth();
// const Stack = createNativeStackNavigator();

const LoggedInScreen = ({navigation}) => {
    const [accountNumb, setAccountNumb] = useState(123456789);
    const [retrieved, setRetrieved] = useState(false);
    const [user, setUser] = useState({
        emailAddress: '',
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        accountNumber: 12345678901,
    });

    // const sendButtonHandler = () => {
    //     getRecipientUser().then(rUserID => {
    //             return updateTransactions(rUserID).then(_ => setRUserID(rUserID));
    //         },
    //     );
    // };


    // useEffect(() => {
    //     getUsers();
    //
    //     return () => {
    //         setUser({});
    //     };
    // }, []);

    useEffect(() => {

        // getUsers();
        getUsers();
        // console.log('te1st: ' + JSON.stringify(currUser));
        // getUsers();
        return () => {
            setUser({});
        };
    }, [retrieved]);

    const getUsers = async () => {

        const userRef = db.collection('users').doc(auth.currentUser.uid);
        try {
            return await db.runTransaction(async (t) => {
                const doc = await t.get(userRef);
                setUser({
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    address1: doc.data().address1,
                    address2: doc.data().address2,
                    city: doc.data().city,
                    state: doc.data().state,
                    zipCode: doc.data().zipCode,
                    emailAddress: doc.data().emailAddress,
                    accountNumber: db.collection('bankAccounts').where('userID', '==', auth.currentUser.uid).get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(documentSnapshot => {
                                setAccountNumb(documentSnapshot.get('accountNumber'));
                            });
                        }),
                });
                setRetrieved(true);
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

            <Text style={styles.welcomeText}>Welcome, {user.firstName}!</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.accountBoxContainer}>
                    <View style={styles.topBoxContainer}>
                        <Text style={{color: 'white', alignSelf: 'center', marginTop: 15}}>Accounts</Text>
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
                            <ScrollView>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Accounts', {accountNumb: accountNumb})}>
                                    <Text>...{accountNumb.toString().substring(4)}</Text>
                                </TouchableOpacity>
                            </ScrollView>

                        </View>
                    </View>
                </View>
                <View style={styles.bottomNavBar}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SendMoney', {
                            accountNumb: accountNumb,
                            currentFirstName: user.firstName,
                            currentLastName: user.lastName,
                        })}>
                        <Text style={{color: 'white'}}>Send Money</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity onPress={() => navigation.navigate('SendMoney', accountNumb)}>*/}
                    {/*    <Text style={{color: 'white'}}>Request Money</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </ScrollView>
            <View style={styles.bottomBarContainer}>
                <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                    <Text style={styles.bottomBarText}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
    bottomNavBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },


});
export default LoggedInScreen;
