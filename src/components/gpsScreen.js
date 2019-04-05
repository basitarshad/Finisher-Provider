import React, { Component } from 'react';
import { Image,View,Text,TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from 'react-native-responsive-screen';
//import gpsimage from '../../assets/images/download.jpeg'
import gpsicon from '../../assets/images/gpsicon.png'
import gpsimage from '../../assets/images/gpsbackground.jpg'
import {Location} from 'expo'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

class GPSscreen extends Component {

    

    nBtnPress = () => {
        Location.hasServicesEnabledAsync().then((data)=> {
            if(data==true){
                this.props.navigation.navigate('MapView')
            }
            else{
                alert('Please enable GPS to proceed further')
            }
        })
    }

    render() {
    return (
        <View style={styles.container}>
            <Image
                source={gpsimage}
                style={styles.imageContainer}
            />
            <Text style={styles.text1}>
                Enable GPS
            </Text>
            <Text style={styles.text2}>
                Please enable GPS to proceed further as using Google maps require enabling GPS services
            </Text>
            <TouchableOpacity style={styles.enableBtn} onPress={() => this.nBtnPress()}>
                <Text style={styles.text3}>
                    Enable
                </Text>
            </TouchableOpacity>
        </View>
    );
  }
}

GPSscreen.propTypes = {
    navigation: PropTypes.object
  };

  const mapStateToProps = ({ authReducer }) => {
    return {
        userInfo: authReducer.userInfo
    };
};

export default connect(mapStateToProps, null)(GPSscreen)

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('96%'),
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('3%'),
        
    },
    imageContainer: {
        width: wp('90%'),
        height: hp('50%'),
    },
    messageContainer: {
        backgroundColor: '#000'
    },
    text1:{
        height: hp('6%'),
        fontWeight:'bold',
        fontSize:hp('2.7%'),
        marginTop:hp('5%')
    },
    text2:{
        height: hp('6%'),
        fontStyle:'italic',
        fontSize:hp('2%')
    },
    enableBtn:{
        height: hp('10%'),
        width: wp('90%'),
        backgroundColor:'#1e90ff',
        marginTop:hp('5%'),
        justifyContent:'center',
        alignItems: 'center'
    },
    text3:{
        fontSize: hp('3%'),
        color:'white'
    }
});