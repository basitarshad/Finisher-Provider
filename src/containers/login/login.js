import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, StatusBar, Text, FormValidationMessage, AsyncStorage } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import * as actions from '../../store/actions/auth';

import LoginForm from '../../components/loginForm';
import { LogoComponent, BackgroundComponent } from '../../../components';
// image background-
  

class Login extends Component {

    componentWillReceiveProps(props) {
        if (props.isLoggedIn) {
            AsyncStorage.getItem('auth').then((response) => {
                let res= JSON.parse(response);
                this.props.getProviderInfo(res.data.token);
              });
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <BackgroundComponent>
                <StatusBar backgroundColor="#02abb0" barStyle="light-content" />
                    <ScrollView>
                        <View style={styles.container}>
                            <LogoComponent />
                            <View style={styles.formContainer}>
                                <Text style={styles.errorMessage}>{this.props.error ? this.props.error : ''}</Text>
                                <LoginForm
                                    navigate    = { navigate }
                                    isLoggedIn  = { this.props.isLoggedIn }
                                    fbFunction  = { () => this.props.facebookLogin() }
                                    login       = { (credentials) => this.props.login(credentials) }
                                />
                            </View>
                        </View>
                    </ScrollView>
            </BackgroundComponent>
        );
    }
}
const mapStateToProps = ({ authReducer }) => {
    return {
        token       : authReducer.token,
        isLoggedIn  : authReducer.isLoggedIn,
        pending     : authReducer.pending,
        error       : authReducer.error
    };
};

export default connect(mapStateToProps, actions)(Login);

const styles = StyleSheet.create({

    logoContainer: {
        alignItems      : 'center',
        justifyContent  : 'center',
        height          : hp('25%')
    },
    formContainer: {
        justifyContent  : 'flex-start',
        paddingTop      : hp('5%'),
        height          : hp('75%'),
        paddingHorizontal   : wp('4%')
    },
    errorMessage: {
       color            : 'red',
       fontSize         : 10,
       textAlign        : 'center'

    }
});
