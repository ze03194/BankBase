/* eslint-disable prettier/prettier,no-trailing-spaces */
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import '@react-native-firebase/firestore';


const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logoImg} source={require('../BankBaseMobile/images/BankBaseLogo.png')}/>
            </View>
            <View style={styles.topBarContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.topBarText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.topBarText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.topBarText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.topBarText}>Contact Us</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{fontSize: 25, color: 'white'}}>Why Us?</Text>
                <Text style={styles.paragraphText}>
                    {'\n'}{'\n'}
                    Here at BankBase, we've partnered with major banking institutions around the country to provide
                    an easier banking experience for all. {'\n'}{'\n'}
                    The convenience and flexibility of access to major banking institutions through our centralized
                    system, allows us to provide a hassle-free banking experience. {'\n'}{'\n'}
                    Our customers choose us, for us. We strive to provide our customers with great service and
                    hassle-free experience. {'\n'}{'\n'}
                    With 24/7 access to customer service, BankBase is able to provide assistance to customers around
                    the clock.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#02295F',
    },
    logoContainer: {},
    logoImg: {
        width: 425,
        height: 80,
    },
    paragraphText: {
        color: 'white',
    },
    topBarText: {
        color: 'white',
        fontSize: 18,
    },
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginTop: 10,
    },

});
export default HomeScreen;
