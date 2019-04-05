import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, Dimensions, StatusBar, Picker } from 'react-native';

// importing logo Image Componentt
import LogoComponent from '../../components/logo';
import BackgroundImage from '../../../assets/images/banner-login.jpg';
import SignupForm from '../../components/signupForm';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
class Signup extends Component {
    constructor(props) {
        super(props);
    }


    onSubmit(obj) {
        this.props.uploadImageAsync(obj)
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ImageBackground
                source={BackgroundImage}
                style={styles.fixed}
            >
                <StatusBar backgroundColor="#125c94" barStyle="light-content" />
                <ScrollView
                    style                       = {styles.container}
                    keyboardDismissMode         = 'none'
                    keyboardShouldPersistTaps   = 'never'
                >
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <LogoComponent />
                        </View>
                        <View style={styles.formContainer}>
                            <SignupForm 
                            navigate    = {navigate} 
                            error       = { this.props.error }
                            isRegister  = { this.props.isRegister }  
                            onsubmit    = { (obj) => this.onSubmit(obj) } /> 
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        isRegister: authReducer.isRegister,
        error: authReducer.error
    };
};

export default connect(mapStateToProps, actions)(Signup);
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        position: 'relative'
    },
    fixed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '25%',
        height: '25%'
    },
    formContainer: {
        justifyContent: 'flex-end',
        paddingVertical: '10%',
        height: '75%'
    },
    containerDimensions: {
        width: Dimensions.get('window').width, //for full screen
        height: Dimensions.get('window').height, //for full screen
        marginBottom: 0,
        flex: 1
    }
});
