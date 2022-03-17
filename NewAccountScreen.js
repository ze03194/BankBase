import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import {getUser} from './redux/slices/userDataSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {createAccount} from './redux/slices/accountsSlice';
import {Logo, styles} from './stylesExports';

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
        <SafeAreaView style={styles.mainContainer}>
            <Logo/>
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
                <TouchableOpacity style={styles.submitButton} onPress={() => {
                    dispatch(createAccount({accountType}));
                    navigation.navigate('LoggedIn');
                }}>
                    <Text style={styles.textButton}>Confirm</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
export default NewAccountScreen;
