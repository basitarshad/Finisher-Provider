import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Text, StatusBar } from 'react-native';

// importing logo Image Componentt
import LogoComponent from '../../components/logo';
// image background
import BackgroundImage from '../../../assets/images/banner-login.jpg';
import { heightPercentageToDP } from 'react-native-responsive-screen';

class SignUpComplete extends Component {

    render() {
        return (
            <ImageBackground source={BackgroundImage} style={{ width: '100%' }}>
            <StatusBar backgroundColor="#125c94" barStyle="light-content" />
            <View style={styles.container}>
                <LogoComponent />
                <Text style={styles.headingText}>
                    Signup Complete
                </Text>
                <Text style={styles.bottomText}>
                    Thank you for signing up, your account is under review and we will notify you once its activated
                </Text>
            </View>
            </ImageBackground>
        );
    }
}


export default SignUpComplete;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        height: '100%',
        padding: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        fontSize: 24,
        color: 'black',
        fontWeight: '300',
        marginTop: heightPercentageToDP('4%')
    },
    bottomText: {
        fontSize: 14, 
        color: 'black',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '80%'
    }
});
