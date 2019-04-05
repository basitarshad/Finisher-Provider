import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native';

// importing logo Image Component
import LogoComponent from '../../components/logo';
import BackgroundImage from '../../../assets/images/banner-login.jpg';
import MainScreen from '../../components/mainView';

export default class Main extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground 
                source={BackgroundImage} 
                // eslint-disable-next-line no-sequences
                style={styles.fixed, styles.containerDimensions, { zIndex: -1 }}
            >
                <StatusBar backgroundColor="#125c94" barStyle="light-content" />
                <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <LogoComponent />
                        </View>
                        <View style={styles.formContainer}>
                            <MainScreen navigate={navigate} />
                        </View>            
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
        height: '10%'
    },
    formContainer: {
        justifyContent: 'flex-end',
        paddingVertical: '10%',
        height: '90%'
    },
    fixed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    containerDimensions: {
        width: Dimensions.get('window').width, //for full screen
        height: Dimensions.get('window').height, //for full screen
        marginBottom: 0,
        flex: 1
    }
});
