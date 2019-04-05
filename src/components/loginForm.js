/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
import React, { Component } from 'react';
import { AppInputField, AppSuccessButton } from '../../components';
import {
    View, 
    Text,
    StyleSheet, 
    TouchableWithoutFeedback
} from 'react-native';
import { 
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import { Location } from 'expo';
// importing components
export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username        : '',
            password        : '',
            phone           :'',
            emailVerified   :false,
            passwordVerified:false,
            phoneVerified   :false
        };
    }    

    login = () => {
      const {username, password, phone} = this.state; 
      const body={
          username:phone,
          password:password
      }
      this.props.login(body)
    };

    componentWillReceiveProps(props){
        if (props.isLoggedIn) {
            Location.hasServicesEnabledAsync().then((data)=> {
                if(data==true){
                    this.props.navigate('MapView')
                }
                else{
                    this.props.navigate('GPSscreen')
                }
            })  
        }
    }
    
    validate(text,type){

        alf      = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        num      = /(?=.{8,})/
        phonenum = /(?=.{11,})/

        if(type=='email'){
          this.setState({ email: text });
          if(alf.test(text))
            this.setState({ emailVerified: true });
          else
            this.setState({ emailVerified: false });
        }
        else if(type=='password'){
          this.setState({ password: text });
          if(num.test(text))
          this.setState({ passwordVerified: true })
          else
            this.setState({ passwordVerified: false })          
        }
        else if(type=='phone'){
          this.setState({ phone: text });
          if(phonenum.test(text))
            this.setState({ phoneVerified: true })
          else
            this.setState({ phoneVerified: false })
        }
      }


  render() {
       
    return (
       <View style={styles.container}>
            <Text style={{ fontFamily: 'Myriad-Pro-Regular', fontSize: hp('4%'), color: '#02abb0', marginVertical: hp('2%'), fontWeight: '800' }}>
                SIGN IN 
            </Text>
            <AppInputField 
                placeholder     = "Phone"
                returnKeyType   = "next"
                keyboardType    = "numbers-and-punctuation"
                value           = { this.state.phone }
                onSubmitEditing = { () => this.passwordInput.focus() }
                onChangeText    = { (value) =>this.validate(value,'phone') } 
            />
            <AppInputField 
                secureTextEntry
                placeholder     = "Password"
                returnKeyType   = "go"
                ref             = {(input) => this.passwordInput = input}
                value           = { this.state.password }
                onSubmitEditing = { () => this.passwordInput.focus() }
                onChangeText    = { (value) =>this.validate(value,'password')}
            />
            <AppSuccessButton 
                onPress         = { () => this.login() }
            > LOGIN
            </AppSuccessButton>
            <View style={styles.signUpPrompt}>
                <Text style={{ fontFamily: 'Myriad-Pro-Regular', color: '#727272', fontSize: hp('2.4%'), fontWeight: '500'}}>
                    Dont have an account? 
                </Text>
                <TouchableWithoutFeedback onPress={() => this.props.navigate('Signup')}>
                    <Text style={{ fontFamily: 'Myriad-Pro-Regular', fontSize: hp('3%'), color: '#02abb0', fontWeight: '500' }}>
                        Sign Up 
                    </Text>
                </TouchableWithoutFeedback>
            </View>
            {/* <TextInput
                placeholder="Phone" 
                returnKeyType="next"
                style={[!this.state.phoneVerified?styles.inputerror:styles.input]}
                keyboardType='name-phone-pad'
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={() => this.passwordInput.focus()}
                value={this.state.phone}
                onChangeText={(value) =>this.validate(value,'phone')}
            /> */}
            {/* <TextInput 
                placeholder="Password"
                returnKeyType="go"
                style={[!this.state.passwordVerified?styles.inputerror:styles.input]}
                secureTextEntry 
                ref={(input) => this.passwordInput = input}
                value={this.state.password}
                onChangeText={(value) =>this.validate(value,'password')}
            /> */}
            {/* <TouchableWithoutFeedback 
                style={{ width: '100%' }}
                onPress={() => this.props.navigate('Timer')}                
            >
                <Text style={styles.forgotPassword}>                     
                    <Text style={styles.colorBlue}> Forgot Password?
                    </Text>
                </Text>
            </TouchableWithoutFeedback> */}
            {/* <TouchableOpacity 
                style={styles.buttonContainer} 
                onPress={() => this.login()}
                disabled={this.state.passwordVerified && this.state.phoneVerified ? false : true}
            >
                <Text style={styles.themebtn}>
                    LOGIN
                </Text>
            </TouchableOpacity> */}
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width           : '100%',
        justifyContent  : 'flex-start',
        alignItems      : 'center',
        padding         : '5%',
        backgroundColor : '#FDFDFD',
        borderRadius    : 8
    },
    signUpPrompt: {
        width           : wp('80%'), 
        height          : hp('5%'), 
        marginTop       : hp('0.4%'), 
        flexDirection   : 'row', 
        justifyContent  : 'space-between',
        alignItems      : 'center',
        paddingHorizontal: wp('5%')
    }
});
