import { connect } from 'react-redux';
import React , { Component } from 'react';
import * as actions from '../../store/actions/auth';
import { LinearGradient } from 'expo';
import { BackgroundComponent, LogoComponent, AppInputField, AppSuccessButton } from '../../../components';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import icon from '../../../assets/images/icons/docter.png'

 class PhoneScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            phoneConfirm    : false,
            pin             : '',
            pinVerified     : true,
            phone           : '',
            code            : '',
            phoneEntered    : false,
            codeSent        : false,  
            phoneValidated  : true,
            errorMessage    : null
        }
        this.checkCode  = this.checkCode.bind(this);
        this.phoneCheck = this.phoneCheck.bind(this);
    }
    validate(text,type){
        phonenum    = /([0-9]{11})/
        pincheck    = /([0-9]{4})/

        if (type=='phone'){
            this.setState({ phone : text });
            if(phonenum.test(text))            
                this.setState({ phoneValidated : true })
            else
                this.setState({ phoneValidated : false })        
        }
        else if(type=='pin'){
            this.setState({ pin: text });
            if(pincheck.test(text))
              this.setState({ pinVerified: true })
            else
              this.setState({ pinVerified: false })
        }
    }

    // phone number validation
    phoneCheck( phone ) {
        this.props.checkPhoneNumber( this.state.phone );
    }

    // check code to verify phone number
    checkCode() {
        this.props.verfiyCode( this.state.phone, this.state.pin );
    }

    componentWillReceiveProps( nextProps ){
        (nextProps.isCodeSent) ? this.setState({ codeSent: true }) : this.setState({ codeSent: false });
        ( nextProps.errorOnPhoneVerification ) ? 
        this.setState({ errorMessage: nextProps.errorOnPhoneVerification }) : this.setState({ errorMessage: null }) 
        if (nextProps.isCodeMatched) {
            this.props.navigation.navigate('EmailScreen');
        }
    }
    componentWillUnmount (){
        this.props.clearPhoneScreenData();
    }

render(){

    return(
        <BackgroundComponent>       
            <LinearGradient colors={["#09ABB3","#09ABB3", "#16B0B0", "#1EB5B1"]} style={{ height: hp('35%'), width: wp('100%'), alignItems: 'center'}}>
                <LogoComponent />
                <Text style={{ fontFamily: 'Myriad-Pro-Regular', fontSize: hp('3%'), color: '#FDFDFD', fontWeight: '500' }}>
                    VERIFY MOBILE 
                </Text>
                <Text style={{ fontFamily: 'Myriad-Pro-Regular', fontSize: hp('2.8%'), color: '#FDFDFD', fontWeight: '400', marginTop: hp('1%') }}>
                    Please enter your Phone Number 
                </Text>
            </LinearGradient>     
            <View style={{ backgroundColor: '#FDFDFD', height: hp('65%'), width: wp('100%')}}>
                { !this.state.codeSent ?  
                <View style={styles.phoneVerifyView}>
                    <AppInputField 
                        keyboardType    = 'number-pad'
                        placeholder     = "Phone Number"
                        value           = { this.state.phone }
                        onChangeText    = { (value) =>this.validate(value,'phone') }
                        style           = {[!this.state.phoneValidated ? styles.inputerror : null]}
                    />
                    <View style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <Text style={{textAlign: 'right', color: 'red'}}>{this.props.errorOnPhoneVerification}</Text>
                    </View>
                    <AppSuccessButton
                        onPress         = { () => this.phoneCheck( this.state.phone ) }
                    > Send Code </AppSuccessButton>
                </View>: 
                <View style={styles.phoneVerifyView}>
                    <Text style={{ marginVertical: hp('1%'), fontFamily: 'Myriad-Pro-Regular', fontSize: hp('2.7%'), color: '#09ABB3', fontWeight: '400' }}>
                        Please Enter your 4 Digit Code for ( {this.state.phone} )
                    </Text>
                    <AppInputField 
                        keyboardType    = 'number-pad'
                        placeholder     = "Enter Pin"
                        value           = { this.state.pin }
                        onChangeText    = { (value) =>this.validate(value,'pin') }
                        style           = {[!this.state.pinVerified ? styles.inputerror : null]}
                    />
                    <AppSuccessButton 
                        onPress         = { ()=> this.checkCode() }
                    > Confirm 
                    </AppSuccessButton>
                    <AppSuccessButton 
                        onPress = { ()=> this.phoneCheck() }
                    > Resend Code 
                    </AppSuccessButton>
                </View>
                }
            </View>
        </BackgroundComponent>
    );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        isCodeSent                  : authReducer.isCodeSent,
        isCodeMatched               : authReducer.isCodeMatched,
        errorOnPhoneVerification    : authReducer.errorOnPhoneVerification,
    };
};


export default connect(mapStateToProps, actions)(PhoneScreen);

const styles = StyleSheet.create({

    phoneVerifyView: {
        marginTop       : hp('2%'),
        justifyContent  : 'flex-start',
        alignItems      : 'flex-start',
        width           :  wp('100%'),
        paddingHorizontal: wp('10%')
    },
    inputerror: {
        borderColor     : 'red'        
    }
})