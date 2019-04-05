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

class AgreementComplete extends Component {
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
                        <View style={styles.details}>
                        <Text style={styles.themebtn}>
                                Time Taken
                        </Text>
                        <Text style={styles.infoLabel}>
                                01 : 15 : 00
                        </Text>
                        </View>
                        <View style={styles.details}>
                        <Text style={styles.infoLabel}>
                               Service Charge
                        </Text>
                        <Text style={styles.infoLabel}>
                                Rs 550/-
                        </Text>
                        </View>
                        <View style={styles.details}>
                        <Text style={styles.infoLabel}>
                               Total (inc tax)
                        </Text>
                        <Text style={styles.themebtn}>
                                Rs 650/-
                        </Text>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AgreeFixPrice')}>
                            <Text style={styles.text}>
                                Proceed
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
        width: wp('90%'),
        marginVertical: hp('0.5%'),
        justifyContent: 'space-between',
        paddingHorizontal: wp('2%')
    },
    text: {
        textDecorationLine: 'underline', 
        color: '#125c94'
    },
    infoLabel: {
        marginVertical: hp('0.5%'),
        width: wp('40%'),
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
        marginVertical: hp('0.5%')
      }
});

export default AgreementComplete;