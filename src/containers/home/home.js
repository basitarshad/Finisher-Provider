import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { heightPercentageToDP as hp, 
    widthPercentageToDP as wp 
} from 'react-native-responsive-screen';

// importing logo Image Component
import LogoComponent from '../../components/logo';
import BackgroundImage from '../../../assets/images/banner-login.jpg';
import HomeScreen from '../../components/homeView';



export default class Home extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground 
                source={BackgroundImage} 
                // eslint-disable-next-line no-sequences
                style={styles.fixed}
            >
                <StatusBar backgroundColor="#125c94" barStyle="light-content" />
                <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <LogoComponent />
                        </View>
                        <View style={styles.formContainer}>
                            <HomeScreen navigate={navigate} />
                        </View>            
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        height: hp('100%')
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: hp('10%')
    },
    formContainer: {
        justifyContent: 'center',
        height: hp('80%'),
        paddingVertical: hp('15%'),
    },
    fixed: {
        position: 'absolute',
        width: wp('100%')
    }
});
