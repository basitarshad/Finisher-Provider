import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//importing dummy image
import dummyImage from '../../assets/images/user-dummy.png';

class ProviderBio extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={dummyImage} style={styles.imageView}/>
                <Text style={styles.nameLabel}>
                    Yousaf
                </Text>
                <Text style={styles.infoLabel}>
                    0333-1234567
                </Text>
                <Text style={styles.infoLabel}>
                    Electrician
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        padding: hp('2%')
    },
    imageView: {
        width: '31%',
        height: '35%'
    },
    nameLabel: {
        backgroundColor: '#125c94',
        color: '#fff',
        width: wp('70%'),
        height: hp('6%'),
        marginVertical: hp('1%'),
        borderRadius: 5,
        textAlign: 'center',
        paddingTop: hp('1.5%')    
    },
    infoLabel: {
        marginVertical: hp('1%'),
        width: wp('70%'),
        height: hp('6%'),
        borderColor: '#125c94',
        borderRadius: 5,
        borderWidth: 2.5,
        textAlign: 'center',
        paddingTop: hp('1.5%')
    }
});

export default ProviderBio;