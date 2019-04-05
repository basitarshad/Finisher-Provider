import React , { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// importing all view components
import Email from './EmailScreen';
import UploadCnic from './uploadCnic';
import PhoneScreen from './PhoneScreen';
import ProfileImage from './profileImageScreen';
import SignUpCompleteScreen from '../../containers/signUpComplete/signUpComplete';

export default class Signup extends  Component{
    render(){
        return(
            <SignUpContainer />
        );
    }
}

// creating switch navigator screens stack
const SignupSwitchNavigator = createSwitchNavigator({
    Phone           : { screen  : PhoneScreen },
    EmailScreen     : { screen  : Email },
    UploadCnic      : { screen  : UploadCnic },
    ProfileImage    : { screen  : ProfileImage },
    SignUpComplete  : { screen  : SignUpCompleteScreen }
    },{
        initialRouteName:'Phone'
    }
);

const SignUpContainer = createAppContainer(SignupSwitchNavigator);

