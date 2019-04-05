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

class AgreeFixPrice extends Component {
    render () {
        return (
            <ImageBackground source={bgImage} style={{ width: '100%'}}>
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <ProviderBio />
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.details}>
                        <Text style = {styles.heading}>
                                Experience on Finisher
                            </Text>
                            <Text style={styles.text}>
                                2 YEARS
                            </Text>
                        </View>
                        <View style={styles.details}>
                        <Text style = {styles.heading}>
                                Experience on Finisher
                            </Text>
                            <Text style={styles.text}>
                                2 YEARS
                            </Text>
                        </View>
                        <View style={styles.details}>
                        <Text style = {styles.heading}>
                                Agreed Number of Days
                            </Text>
                            <Text style={styles.text}>
                                05
                            </Text>
                        </View>
                        <View style={styles.details}>
                        <Text style = {styles.heading}>
                                Agreed Price
                            </Text>
                            <Text style={styles.text}>
                                Rs 10, 000/-
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AgreeFixTrack')}>
                            <Text style={styles.themebtn}>
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
        width: wp('80%'),
        marginVertical: hp('1%'),
        justifyContent: 'space-between',
        paddingHorizontal: wp('2%')
    },
    text: {
        textDecorationLine: 'underline', 
        color: '#125c94'
    },
    heading: {
        fontWeight: '900',
        fontSize: hp('2.5%'),
        color: 'black'
    },  
    themebtn: {
        backgroundColor: '#125c94',
        borderColor: 'white',
        borderRadius: 6,
        width: wp('45%'),
        color: '#fff',
        fontSize: hp('3%'),
        height: hp('6%'),
        textAlign: 'center',
        padding: hp('1%'),
        marginVertical: hp('1%')
      }
});


export default AgreeFixPrice;