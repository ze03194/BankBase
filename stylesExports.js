import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

export const Logo = () => {
    return (
        <View style={styles.logoContainer}>
            <Image style={styles.logoImg} source={require('../BankBaseMobile/images/BankBaseLogo.png')}/>
        </View>
    );
};

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#02295F',
    },
    scrollContainer: {
        flex: 1,
        justifyContent: 'center',
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
    logoContainer: {
        maxHeight: '10%',
    },
    logoImg: {
        width: '100%',
        height: '100%',
    },
    inputTextContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
    },
    inputText: {
        backgroundColor: 'white',
        width: '64%',
        borderBottomWidth: 1,
        marginBottom: 7,
    },
    optionsText: {
        color: 'white',
        fontSize: 18,
    },
    welcomeText: {
        color: 'white',
        marginTop: '5%',
        marginLeft: '2.5%',
        fontSize: 25,
    },
    errorTexts: {
        color: 'red',
        fontSize: 14,
        marginBottom: '2%',
        fontWeight: 'bold',
    },
    dropDownMenu: {
        backgroundColor: 'white',
        minWidth: '64%',
        maxHeight: '5.6%',
        marginBottom: '1.65%',
    },
    middleNavBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%',
    },
    accountBalanceText: {
        color: 'black',
        fontWeight: 'bold',
        marginLeft: '1.5%',
    },
    accountsTextContainer: {
        minHeight: 60,
    },
    flatListContainer: {
        // minWidth: 250,
        // minHeight: 250,
        minWidth: '100%',
        minHeight: '30%',
        backgroundColor: 'white',
        marginTop: '2.5%',

    },
    flatListText: {
        color: 'black',
        fontWeight: 'bold',
    },
    flatListDisplay: {
        flex: 1,
        borderTopWidth: 1.5,

    },
    topFlatList: {
        minWidth: '75%',
        maxWidth: '75%',
        minHeight: '10%',
        marginTop: '5%',
        backgroundColor: '#02295F',
        alignSelf: 'center',
        borderWidth: 1,
    },
    flatListBackground: {
        backgroundColor: 'white',
    },
    accountOptionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 10,
    },
    submitButton: {
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        width: '40%',
        elevation: 3,
        backgroundColor: 'white',
        borderWidth: 2,
        marginBottom: '5%',
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#02295F',
    },

});
