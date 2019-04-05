import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export class AppInputField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          focusStyle: {},
        };
    }
    
    onFocus = () => {
        console.log(styles.InputFocusStyle);
        this.setState({
            focusStyle: styles.InputFocusStyle
        });
    }
    
    onBlur = () => {
        this.setState({
            focusStyle: {}
        });
    }   
    
    
  render() {

    return <TextInput 
                {...this.props} 
                style={[ styles.inputStyles, this.state.focusStyle, { fontFamily: 'Myriad-Pro-Regular', zIndex: 100 }, this.props.style ]} 
                placeholderTextColor    = "#d1d1d1"               
                autoCapitalize          = "none"
                onFocus                 = { () => this.onFocus() }
                onBlur                  = { () => this.onBlur() }
                autoCorrect             = { false }
            />;
  }
};

const styles = StyleSheet.create({
    inputStyles: {
        color               : '#727272',
        width               : wp('80%'),
        height              : hp('7%'),
        fontSize            : hp('3%'),
        borderRadius        : 6,
        borderColor         : '#02abb0',
        backgroundColor     : 'transparent',
        paddingHorizontal   : wp('2%'),
        marginVertical      : hp('1.2%'),
        borderWidth         : 1.5
    },
    InputFocusStyle: {
        shadowColor         : "black",
        shadowOpacity       : 0.8,
        shadowRadius        : 5,
        shadowOffset : {
            height  : 2,
            width   : 0
        } 
    }
});