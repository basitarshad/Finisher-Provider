import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Rating } from 'react-native-elements';
// importing component
import ProviderBio from '../../components/providerBio';
import bgImage from '../../../assets/images/banner-login.jpg';

class AvailableProvider extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <ProviderBio />
                </View>
                <View style={{ alignContent: 'center', alignItems: 'center'}}>
                    <View style={styles.details}>
                        <Text>
                            EXPERIENCE ON FINISHER
                        </Text>
                        <Text style={styles.text}>
                            2 YEARS
                        </Text>
                    </View>
                    <View style={styles.details}>
                    <Text>
                            EXPERIENCE ON FINISHER
                        </Text>
                        <Text style={styles.text}>
                            2 YEARS
                        </Text>
                    </View>
                    <Text> Rating </Text>
                    {/* <Rating 
                        type="star"
                        fractions={1}
                        startingValue={3.6}
                        readonly
                        imageSize={40}
                    /> */}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('initAgreement')}>
                        <Text style={styles.themebtn}>
                            Proceed
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        height: hp('100%'),
        width: wp('100%')
    },
    ratingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('46%')
    },
    profileContainer: {
        height: hp('50%'),
        width: wp('100%')
    },
    details: {
        flexDirection: 'row',
        width: wp('80%'),
        marginVertical: hp('1%'),
        justifyContent: 'space-between'
    },
    text: {
        textDecorationLine: 'underline', 
        color: '#125c94'
    },
    themebtn: {
        backgroundColor: '#125c94',
        borderColor: 'white',
        borderRadius: 6,
        color: '#fff',
        fontSize: hp('3%'),
        width: wp('60%'),
        height: hp('7%'),
        textAlign: 'center',
        padding: hp('1%'),
        marginTop: hp('5%')
      }
});

export default AvailableProvider;