import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export class AppSuccessButton extends React.Component {    
  render() {
    return (
        <TouchableOpacity {...this.props} style ={[ styles.buttonContainer, this.props.style ]} >
            <Text style={[{ fontFamily: 'Myriad-Pro-Regular' }, styles.successButton, this.props.buttonStyle]} >
            {this.props.children}
            </Text>
        </TouchableOpacity>        
    );
  }
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems      : 'center',
        justifyContent  : 'center',
        width           : wp('80%'),
        height          : hp('7%'),
        borderRadius    : 6,
        marginVertical  : hp('1.2%')
    },
    successButton: {
        backgroundColor : '#13AFB2',
        color           : '#DFFCFC',
        fontSize        : hp('3.2%'),
        width           : '100%',
        height          : '100%',
        textAlign       : 'center',
        borderRadius    : 6,
        paddingTop      : hp('1.5%')
    }
});