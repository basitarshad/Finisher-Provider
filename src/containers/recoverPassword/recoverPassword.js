import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native';

// importing logo Image Componentt
import LogoComponent from '../../components/logo';
// image background
import BackgroundImage from '../../../assets/images/banner-login.jpg';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from 'react-native-responsive-screen';

class ForgotPassword extends Component {

constructor(props){
    super(props);
    this.state={
        phone:'',
        confirmPin:false,
        password:''
    }
}

    render() {
        return (
            <ImageBackground source={BackgroundImage} style={{ width: '100%' }}>
            <View style={styles.container}>
                <LogoComponent />
            <TextInput 
                style={styles.phoneInputPin}
                placeholder="New Password"
                keyboardType="password"
                placeholderTextColor="#a38181"
                returnKeyType="next"
                onChangeText={value => this.setState({ password: value.trim() })}
            />
            <TextInput 
                style={styles.phoneInputPin}
                placeholder="Confirm Password"
                keyboardType="password"
                placeholderTextColor="#a38181"
                returnKeyType="next"
                onChangeText={value => this.setState({ password: value.trim() })}
            />
            <TouchableOpacity style={styles.submitBtn}>
                <Text style={styles.submitText}>Confirm Password</Text>
            </TouchableOpacity>
            </View>
            </ImageBackground>
        );
    }
}


export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        height: hp('100%'),
        padding: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        fontSize: 24,
        color: 'black',
        fontWeight: '300'
    },
    phoneInput: {
        height: hp('8%'),
        marginVertical: '2%',
        backgroundColor: 'transparent',
        borderRadius: 5,
        paddingVertical: '2%',
        width: wp('80%'),
        borderColor: '#125c94',
        borderWidth: 2.5,
        fontSize: 14,
        color: '#747474',
        padding: '5%'
    },
    submitBtn:{
        alignItems: 'center',
        width: '100%',
        height: '70%',
        justifyContent:'flex-end'
    },
    submitText:{
        backgroundColor: '#125c94',
        borderRadius: 5,
        color: '#fff',
        fontSize: 18,
        padding: '3%',
        width: wp('100%'),
        height: hp('100%'),
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        height: '12%'
    },
    headingTextPin: {
        fontSize: 24,
        color: 'red',
        fontWeight: '300',
        fontWeight:'bold'
    },
    phoneInputPin: {
        height: hp('8%'),
        marginVertical: '2%',
        backgroundColor: 'transparent',
        borderRadius: 5,
        paddingVertical: '2%',
        width: wp('80%'),
        borderColor: '#125c94',
        borderWidth: 2.5,
        fontSize: 14,
        color: '#747474',
        padding: '5%'
    }
});
