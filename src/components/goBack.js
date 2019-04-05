import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import IOSIcon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { 
    heightPercentageToDP as hp, 
    widthPercentageToDP as wp 
} from 'react-native-responsive-screen';

class BackButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }} >
                <Ionicons name="md-arrow-round-back" size= {35} style={{ padding: hp('1%'), marginRight: wp('2%') }} />
            </TouchableOpacity>
        );
    }
}

export default BackButton;
