import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { 
  heightPercentageToDP as hp, 
  widthPercentageToDP as wp 
} from 'react-native-responsive-screen';

// importing logo 
import logoImage from '../../assets/images/logo.png';

export default class Logo extends Component {
  render() {
    return (      
        <Image 
        style={styles.logoStyles}
        source={logoImage}
        />
    );
  }
}

const styles = StyleSheet.create({
    logoStyles: {
        width: wp('68%'),
        height: hp('8%')
    }
});
