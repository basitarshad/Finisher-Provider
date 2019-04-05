import { connect } from 'react-redux';
import React , { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Picker, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as actions from '../../store/actions/auth';
import { BackgroundComponent, LogoComponent, AppInputField, AppSuccessButton } from '../../../components';

class Email extends  Component{

    constructor(props){
        super(props);
        this.state = {
            name        : '',
            nameVerified: false,
            name            : '',
            email           : '',
            password        : '',
            servicename     : '',
            confirmpass     : '',
            passwordMatch   : false,
            emailVerified   : false, 
            serviceVerified : false,
            nameVerified    : false
        }
    }

    check = () => {
        return ( this.state.password === this.state.confirmpass) ? 
        this.setState({ passwordMatch: true }): this.setState({ passwordMatch: false }); 
    }
    validate(text,type){
      alf       = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      num       = /(?=.{8,})/
      phonenum  = /(?=.{11,})/
      name      = /([a-zA-Z]{3,})/
      if(type=='email'){
        this.setState({email:text});
        if(alf.test(text))
        this.setState({emailVerified:true});
        else
          this.setState({emailVerified:false});
      }
      else if(type=='password'){
        this.setState({password:text});
        if(num.test(text))
          this.setState({passwordVerified:true})
        else
          this.setState({passwordVerified:false})
      }
      else if(type=='name'){
          this.setState({name:text});
          if(name.test(text))
            this.setState({nameVerified:true}, ()=>console.log('name verified'))
          else
            this.setState({nameVerified:false}, ()=>console.log('name unverified'))
        }
      else if(type=='passcheck'){
          this.setState({confirmpass:text});
          if(text === this.state.password)
            this.setState({passwordMatch:true})
          else
            this.setState({passwordMatch:false})
        }
  }

      onValueChange(value) {
        this.setState({
          servicename: value
        });
      }

      setBody(){
          let body          = {};
          body.name         = this.state.name;
          body.email        = this.state.email;
          body.password     = this.state.password;
          body.profession   = this.state.servicename;
          
          this.props.infoUpdate(body);
          this.props.navigation.navigate('ProfileImage');
        }

    render(){

        return(
            <BackgroundComponent>
                <LogoComponent />
                <View style={styles.formContainer}>
                    <ScrollView showsVerticalScrollIndicator = {false}>
                    <Text style={styles.header}>
                        What's your Name?
                    </Text>
                    <AppInputField 
                        style           = {{ marginTop: hp('0.3%')}}
                        placeholder     = 'Name'
                        keyboardType    = 'name-phone-pad'
                        onSubmitEditing = { () => this.emailInput.focus() }
                        value           = { this.state.name }
                        onChangeText    = { (value) =>this.validate(value,'name') }
                    />
                    <Text style={styles.header}>
                        What's your Email? ( Optional )
                    </Text>
                    <AppInputField 
                        placeholder     = 'Email (Optional)'
                        keyboardType    = 'email-address'
                        ref             = { (input) => this.emailInput = input} 
                        onSubmitEditing = { () => this.passwordInput.focus()}
                        value           = { this.state.email}
                        onChangeText    = { (value) =>this.validate(value,'email')}
                        style           = {{ width: wp('60%'), marginTop: hp('0.3%')}}
                    />
                    <Text style={styles.header}>
                        What's your Password?
                    </Text>
                    <AppInputField 
                        placeholder     = 'Password'
                        secureTextEntry = {true}
                        ref             = {(input) => this.passwordInput = input}
                        onSubmitEditing = {() => this.confirmPasswordInput.focus()}
                        value           = {this.state.password}
                        onChangeText    = {(value) =>this.validate(value,'password')}
                        style           = {{ marginTop: hp('0.3%')}}
                    />
                    <AppInputField 
                        placeholder     = 'Confirm Password'
                        secureTextEntry = {true}
                        ref             = {(input) => this.confirmPasswordInput = input}
                        value           = {this.state.confirmpass}
                        onChangeText    = {(value) =>this.validate(value,'passcheck')}
                        style           = {{ marginTop: hp('0.3%')}}
                    />
                    <Text style={styles.header}>
                        What's your Profession?
                    </Text>
                    <View style={styles.serviceSelect}>                        
                        <Picker
                                mode            = "dialog"
                                placeholder     = "Services"
                                selectedValue   = {this.state.servicename}
                                style           = {{ height: hp('7%'), width: wp('80%'), justifyContent:'center', color:'#FDFDFD'}}
                                onValueChange   = {this.onValueChange.bind(this)}>
                                <Picker.Item label = 'Select...' />
                                <Picker.Item label = "Painter" value="painter" />
                                <Picker.Item label = "UPS repairing" value="ups repairing" />
                                <Picker.Item label = "Electrician" value="electrician" />
                                <Picker.Item label = "Air Conditioner" value="air conditioner" />
                                <Picker.Item label = "Home Cleaner" value="home cleaner" />
                                <Picker.Item label = "Plumber" value="plumber" />
                                <Picker.Item label = "Carpenter" value="carpenter" />
                                <Picker.Item label = "Decoraiton" value="decoration" />
                        </Picker>
                    </View>
                    <AppSuccessButton
                        style       = {styles.buttonContainer}
                        disabled    = {this.state.passwordVerified && this.state.passwordMatch && this.state.nameVerified ? false : true}
                        onPress     = {()=> this.setBody()}
                    > Proceed
                    </AppSuccessButton>
                    </ScrollView>                    
                </View>    
            </BackgroundComponent>
    );
    }
}

export default connect(null, actions)(Email);
const styles = StyleSheet.create({
    formContainer: {
        flex            : 1,
        alignItems      : 'flex-start', 
        justifyContent  : 'flex-start', 
        width           : wp('100%'), 
        height          : hp('85%'),
        paddingVertical : wp('3%'),
        paddingHorizontal : wp('8%'),
        backgroundColor : '#FDFDFD'
    },
    header:{
        width           : wp('80%'),
        height          : hp('5%'),
        color           : '#13AFB2',
        fontSize        : hp('2.7%'),
        fontWeight      : '500',
        fontFamily      : 'Myriad-Pro-Regular',
        marginTop       : hp('0.5%')
    },
    serviceSelect:{
        width           : wp('80%'),
        justifyContent  : 'center',
        alignItems      : 'center',
        backgroundColor : '#13AFB2',
        borderRadius    : 6,
    }
})