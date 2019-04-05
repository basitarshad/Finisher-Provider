import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { 
    heightPercentageToDP as hp, 
    widthPercentageToDP as wp 
} from 'react-native-responsive-screen';

class DrawerButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => { this.props.navigation.openDrawer(); }} >
                <Ionicons name="md-reorder" size= {35} style={{ padding: hp('1%'), marginRight: wp('2%') }} />                
            </TouchableOpacity>
        );
    }
}

export default DrawerButton;
