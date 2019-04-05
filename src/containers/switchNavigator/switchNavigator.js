import React , { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LogoComponent from '../../components/logo';
import BackgroundImage from '../../../assets/images/banner-login.jpg';
import SignUpSwitch from '../../components/switchNavigator'

export default class App extends Component{
        render(){
            return(
                <ImageBackground
                    source={BackgroundImage}
                    style={styles.fixed}
                >
                    <StatusBar backgroundColor="#125c94" barStyle="light-content" />
                    <ScrollView
                        style={styles.container}
                        keyboardDismissMode='none'
                        keyboardShouldPersistTaps='never'
                    >
                        <View style={styles.container}>
                            <View style={styles.logoContainer}>
                                <LogoComponent />
                            </View>
                            {/* <View style={styles.formContainer}>
                                <SignUpSwitch /> 
                            </View> */}
                        </View>
                    </ScrollView>
                </ImageBackground>
            );
        }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        height: hp('100%'),
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('35%')
    },
    formContainer: {
        justifyContent: 'flex-end',
        height: hp('65%')
    },
    fixed: {
        position: 'absolute',
        width: wp('100%')
    },
    errorMessage: {
       color:'red',
       fontSize:10,
       textAlign:'center'

    }
});