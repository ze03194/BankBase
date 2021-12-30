import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {getUser} from './redux/slices/userDataSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {createAccount} from './redux/slices/accountsSlice';

const NewAccountScreen = ({navigation}) => {

    const [newAccount, setNewAccount] = useState({});
    const [accountType, setAccountType] = useState('');
    const currentUser = useSelector(state => state.userDataReducer.currentUser);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const confirmedProfile = () => {

    };

    const changeTextInput = (key, value) => {
        setNewAccount({
            ...newAccount,
            [key]: value,
        }, []);
    };

    return (
        <SafeAreaView style={styles.registerContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logoImg} source={require('../BankBaseMobile/images/BankBaseLogo.png')}/>
            </View>
            <Text style={{color: 'white', fontSize: 15, marginTop: 20, alignSelf: 'center'}}>Confirm Your Profile
                Information</Text>
            <ScrollView contentContainerStyle={styles.inputTextContainer}>
                <TextInput
                    placeholder={currentUser.firstName}
                    style={styles.inputText}
                    onChangeText={text => changeTextInput('firstName', text)}
                />
                <TextInput
                    placeholder={currentUser.lastName}
                    style={styles.inputText}
                    onChangeText={text => changeTextInput('lastName', text)}
                />
                <TextInput
                    placeholder={currentUser.emailAddress}
                    style={styles.inputText}
                    onChangeText={text => changeTextInput('emailAddress', text)}
                />
                <TextInput
                    placeholder={currentUser.address1}
                    style={styles.inputText}
                    onChangeText={text => changeTextInput('address1', text)}
                />
                <TextInput
                    placeholder={currentUser.address2}
                    style={styles.inputText}
                    onChangeText={text => changeTextInput('address2', text)}
                />
                <TextInput
                    placeholder={currentUser.city}
                    style={styles.inputText}
                    onChangeText={text => changeTextInput('city', text)}
                />
                <TextInput
                    placeholder={currentUser.state}
                    style={styles.inputText}
                    onChangeText={text => changeTextInput('state', text)}
                />
                <TextInput
                    placeholder={currentUser.zipCode}
                    style={styles.inputText}
                    onChangeText={text => changeTextInput('zipCode', text)}
                />
                <Text style={{color: 'white', fontSize: 15, marginVertical: 10, alignSelf: 'center'}}>Choose Account
                    Type</Text>

                <Picker style={styles.dropDownMenu}
                        selectedValue={accountType}
                        onValueChange={itemValue => {
                            setAccountType(itemValue);
                            changeTextInput('accountType', itemValue);
                        }}>
                    <Picker.Item key={'unselectable'} label="Select" value="AccountType"/>
                    <Picker.Item label="Checking" value="Checking"/>
                    <Picker.Item label="Saving" value="Savings"/>
                </Picker>
                <TouchableOpacity style={styles.confirmButton} onPress={() => {
                    dispatch(createAccount({accountType}));
                    navigation.navigate('LoggedIn');
                }}>
                    <Text style={styles.textButton}>Confirm</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    registerContainer: {
        flex: 1,
        backgroundColor: '#02295F',
    },
    logoImg: {
        width: 425,
        height: 80,
    },
    inputText: {
        backgroundColor: 'white',
        width: 250,
        marginLeft: 20,
        borderBottomWidth: 1,
        marginBottom: 7,

    },
    inputTextContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
    confirmButton: {
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        width: 150,
        elevation: 3,
        backgroundColor: 'white',
        borderWidth: 2,
        marginTop: 5,
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#02295F',
    },
    dropDownMenu: {
        backgroundColor: 'white',
        minWidth: 250,
        maxHeight: 20,
        marginLeft: 20,
        marginBottom: 5,
    },


});
export default NewAccountScreen;
