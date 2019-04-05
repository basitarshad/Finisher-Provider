import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

// importing logo 
import UserImage from '../../assets/images/user.png';

export default class Logo extends Component {
  render() {
    return (      
        <View style={styles.imageStyle}>
            <Image 
                source={UserImage}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 90,
        height: 90,
        backgroundColor: '#3f3c3b',
        borderRadius: 50,
        textAlign: 'center',       
        paddingLeft: 20,
        paddingBottom: 15,
        justifyContent: 'center',
        bottom: 25
    }
});
