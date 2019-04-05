import React, { Component } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// importing logo 
import BackgroundImg from '../assets/images/banner-login.jpg';

export class BackgroundComponent extends Component {
    render() {
        return <ImageBackground source={BackgroundImg} style={[styles.background, this.props.style]} {...this.props}/>;
    }
}

const styles = StyleSheet.create({
    background: {
        flex    : 1,
        width   : wp('100%'),
        height  : hp('100%')
    }
});
