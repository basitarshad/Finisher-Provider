import React, { Component } from 'react';
import {connect} from 'react-redux';
import { StyleSheet, TouchableOpacity, Text, View, ImageBackground, Picker } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import * as actions from '../../store/actions';

// importing component
import ProviderBio from '../../components/providerBio';
import bgImage from '../../../assets/images/banner-login.jpg';

class AgreementTime extends Component {
    render () {
        return (
            <ImageBackground source={bgImage} style={{ width: '100%'}}>
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <ProviderBio />
                    </View>
                    <View style={styles.dataContainer}>
                    <View style={styles.details}>
                            <Text>
                                Experience on Finisher
                            </Text>
                            <Text style={styles.text}>
                                2 YEARS
                            </Text>
                        </View>
                        <View style={styles.details}>
                        <Text>
                                Total Jobs Done
                            </Text>
                            <Text style={styles.text}>
                                155
                            </Text>
                        </View>
                        
                        <Text style={styles.themebtn}>
                                Time Taken
                        </Text>
                        <Text style={styles.infoLabel}>
                                00: 00: 00
                        </Text>
                        
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AgreementComplete')}>
                            <Text style={styles.themebtn}>
                                Start
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
};

const styles = StyleSheet.create ({
    container: {
        height: hp('100%'),
        width: wp('100%'),
        paddingHorizontal: wp('3%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileContainer: {
        height: hp('50%'),
        width: wp('100%')
    },
    dataContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: hp('47%')
    },
    details: {
        flexDirection: 'row',
        width: wp('80%'),
        marginVertical: hp('1%'),
        justifyContent: 'space-between',
        paddingHorizontal: wp('2%')
    },
    text: {
        textDecorationLine: 'underline', 
        color: '#125c94'
    },
    infoLabel: {
        marginVertical: hp('1%'),
        width: wp('70%'),
        height: hp('6%'),
        borderColor: '#125c94',
        borderRadius: 5,
        textAlign: 'center',
        paddingTop: hp('1.5%'),
        borderWidth: 2
    },
    themebtn: {
        backgroundColor: '#125c94',
        borderColor: 'white',
        borderRadius: 6,
        width: wp('40%'),
        color: '#fff',
        fontSize: hp('3%'),
        height: hp('6%'),
        textAlign: 'center',
        padding: hp('1%'),
        marginVertical: hp('1%')
      }
});

export default AgreementTime;