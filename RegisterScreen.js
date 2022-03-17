/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import 'intl';
import 'intl/locale-data/jsonp/en-US';
import {ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import {firebase} from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {addUser} from './redux/slices/userDataSlice';
import {useDispatch} from 'react-redux';
import {Logo, styles} from './stylesExports';


const db = firebase.firestore();
const auth = firebase.auth();

const RegisterScreen = () => {
        const [passwordError, setPasswordError] = useState('');
        const [emailError, setEmailError] = useState('');
        const [firstNameError, setFirstNameError] = useState('');
        const [lastNameError, setLastNameError] = useState('');
        const [address1Error, setAddress1Error] = useState('');
        const [address2Error, setAddress2Error] = useState('');
        const [cityError, setCityError] = useState('');
        const [stateError, setStateError] = useState('');
        const [zipCodeError, setZipCodeError] = useState('');
        const [securityPinError, setSecurityPinError] = useState('');

        const dispatch = useDispatch();

        const [registration, setRegistration] = useState({
            password: '',
            emailAddress: '',
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipCode: '',
            securityPin: '',
        });

        const validateInput = () => {

            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const lettersRegex = /^[A-Za-z]+$/;
            const numbersRegex = /^[0-9]+$/;
            let inputValidated = true;

            if (!(emailRegex.test(registration.emailAddress)) || registration.emailAddress === '') {
                setEmailError('Invalid Email Address!');
                inputValidated = false;
            } else {
                setEmailError('');
            }

            if (!passwordRegex.test(registration.password)) {
                setPasswordError('Password must be between 8-15 characters with at least one lowercase, one uppercase' +
                    'one digit, and one special character!');
                inputValidated = false;
            } else {
                setPasswordError('');
            }

            if (!(lettersRegex.test(registration.firstName)) || registration.firstName.length < 2 || registration.firstName === '') {
                setFirstNameError('Invalid name!');
                inputValidated = false;
            } else {
                setFirstNameError('');
            }
            if (!(lettersRegex.test(registration.lastName)) || registration.lastName.length < 2 || registration.lastName === '') {
                setLastNameError('Invalid name!');
                inputValidated = false;
            } else {
                setLastNameError('');
            }
            if (registration.address1.length < 4) {
                setAddress1Error('Invalid Address!');
            } else {
                setAddress1Error('');
            }
            if (!(lettersRegex.test(registration.city)) || registration.city.length < 2) {
                setCityError('Invalid city!');
                inputValidated = false;
            } else {
                setCityError('');
            }
            if (!(lettersRegex.test(registration.state)) || registration.state.length < 2) {
                setStateError('Invalid state!');
                inputValidated = false;
            } else {
                setStateError('');
            }
            if (!(numbersRegex.test(registration.zipCode)) || registration.zipCode.length < 5) {
                setZipCodeError('Invalid zipcode!');
                inputValidated = false;
            } else {
                setZipCodeError('');
            }
            if (!(numbersRegex.test(registration.securityPin)) || registration.securityPin.length < 6) {
                setSecurityPinError('Security pin must be 6 digits!');
                inputValidated = false;
            } else {
                setSecurityPinError('');
            }

            if (inputValidated) {
                dispatch(addUser({newUser: registration}));
            }
        };

        const changeTextInput = (key, value) => {
            setRegistration({
                ...registration,
                [key]: value,
            }, []);
        };

        return (
            <SafeAreaView style={styles.mainContainer}>
                <Logo/>
                <Text style={{color: 'white', fontSize: 15, marginTop: 10, alignSelf: 'center'}}>Registration Form</Text>
                <ScrollView contentContainerStyle={styles.inputTextContainer}>
                    <TextInput
                        placeholder="Email Address"
                        style={styles.inputText}
                        value={registration.emailAddress}
                        onChangeText={text => changeTextInput('emailAddress', text)}
                    />
                    {!!emailError && (
                        <Text style={styles.errorTexts}>{emailError}</Text>
                    )}
                    <TextInput
                        placeholder="Password"
                        style={styles.inputText}
                        value={registration.password}
                        secureTextEntry={true}
                        onChangeText={text => changeTextInput('password', text)}
                    />
                    {!!passwordError && (
                        <Text style={styles.errorTexts}>{passwordError}</Text>
                    )}
                    <TextInput
                        placeholder="First Name"
                        style={styles.inputText}
                        value={registration.firstName}
                        onChangeText={text => changeTextInput('firstName', text)}
                    />
                    {!!firstNameError && (
                        <Text style={styles.errorTexts}>{firstNameError}</Text>
                    )}
                    <TextInput
                        placeholder="Last Name"
                        style={styles.inputText}
                        value={registration.lastName}
                        onChangeText={text => changeTextInput('lastName', text)}
                    />
                    {!!lastNameError && (
                        <Text style={styles.errorTexts}>{lastNameError}</Text>
                    )}
                    <TextInput
                        placeholder="Address1"
                        style={styles.inputText}
                        value={registration.address1}
                        onChangeText={text => changeTextInput('address1', text)}
                    />
                    {!!address1Error && (
                        <Text style={styles.errorTexts}>{address1Error}</Text>
                    )}
                    <TextInput
                        placeholder="Address2"
                        style={styles.inputText}
                        value={registration.address2}
                        onChangeText={text => changeTextInput('address2', text)}
                    />
                    {!!address2Error && (
                        <Text style={styles.errorTexts}>{address2Error}</Text>
                    )}
                    <TextInput
                        placeholder="City"
                        style={styles.inputText}
                        value={registration.city}
                        onChangeText={text => changeTextInput('city', text)}
                    />
                    {!!cityError && (
                        <Text style={styles.errorTexts}>{cityError}</Text>
                    )}
                    <TextInput
                        placeholder="State"
                        style={styles.inputText}
                        value={registration.state}
                        onChangeText={text => changeTextInput('state', text)}
                    />
                    {!!stateError && (
                        <Text style={styles.errorTexts}>{stateError}</Text>
                    )}
                    <TextInput
                        placeholder="Zipcode"
                        style={styles.inputText}
                        keyboardType={'number-pad'}
                        value={registration.zipCode}
                        maxLength={5}
                        onChangeText={text => changeTextInput('zipCode', text)}
                    />
                    {!!zipCodeError && (
                        <Text style={styles.errorTexts}>{zipCodeError}</Text>
                    )}
                    <TextInput
                        placeholder="Security Pin"
                        keyboardType={'number-pad'}
                        style={styles.inputText}
                        value={registration.securityPin}
                        secureTextEntry={true}
                        maxLength={6}
                        onChangeText={text => changeTextInput('securityPin', text)}
                    />
                    {!!securityPinError && (
                        <Text style={styles.errorTexts}>{securityPinError}</Text>
                    )}
                    <TouchableOpacity style={styles.submitButton} onPress={() => validateInput()}>
                        <Text style={styles.textButton}>Register</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        );
    }
;
export default RegisterScreen;
