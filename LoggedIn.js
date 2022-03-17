/* eslint-disable prettier/prettier,no-trailing-spaces */
import React, {useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {useDispatch, useSelector} from 'react-redux';
import {getAccounts, setAccountNumber} from './redux/slices/accountsSlice';
import {useIsFocused} from '@react-navigation/native';
import {getUser} from './redux/slices/userDataSlice';
import {Logo, styles} from './stylesExports';

// const db = firebase.firestore();
// const auth = firebase.auth();
// const Stack = createNativeStackNavigator();

const LoggedInScreen = ({navigation}, props) => {
    const user = useSelector(state => state.userDataReducer.currentUser);
    const accounts = useSelector(state => state.accountsReducer.accounts);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    useEffect(() => {
        dispatch(getAccounts());
        dispatch(getUser());
    }, [dispatch, isFocused]);
    
    return (
        <SafeAreaView style={styles.mainContainer}>

            <Logo/>
            <Text style={styles.welcomeText}>Welcome, {user.firstName}!</Text>
            <View style={styles.flatListContainer}>
                <View style={styles.topFlatList}>
                    <Text style={{color: 'white', alignSelf: 'center', marginVertical: 15}}>Accounts</Text>
                    <View style={styles.flatListBackground}>
                        <FlatList
                            data={accounts}
                            renderItem={({item}) => (
                                <View style={styles.flatListDisplay}>
                                    <TouchableOpacity onPress={() => {
                                        const accountNum = item.accountNumber;
                                        dispatch(setAccountNumber({accountNum}));
                                        navigation.navigate('Accounts');
                                    }}>
                                        <View style={styles.accountsTextContainer}>
                                            <Text
                                                style={styles.flatListText}>...{item.accountNumber.toString().substring(4)} - {item.accountType}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}/>
                    </View>
                    {/*</View>*/}
                </View>
            </View>
            <View style={styles.middleNavBar}>
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

export default LoggedInScreen;
