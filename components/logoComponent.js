import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// importing logo 
import logoImage from '../assets/images/logo.png';

export class LogoComponent extends Component {
    render() {
        return (
            <View {...this.props} style={[this.props.style, styles.logoContainer]}> 
                <Image style={styles.logoStyles} source={logoImage} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        width           : wp('100%'),
        height          : hp('12%'),
        marginVertical  : hp('2%'),
        justifyContent  : 'center',
        alignItems      : 'center'
    },
    logoStyles: {
        width   : wp('68%'),
        height  : hp('8%')
    }
});
