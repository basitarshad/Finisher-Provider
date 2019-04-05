
import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    CheckBox, Button, Image, Picker
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagePicker } from 'expo';
import ImageIcon from '../../assets/images/uploadimage.png';
//import  ImagePicker from 'react-native-image-picker';
export default class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cnic            : '',
            name            : '',
            email           : '',
            phone           : '',
            image           : null,
            checked         : true,
            username        : '',
            password        : '',
            imageRef        : '',
            language        : '',
            uploading       : false,
            backimage       : {},
            frontimage      : {},
            imageResult     : null,
            imageSelected   : false,
            servicename     : '',
            phoneVerified       : false,
            emailVerified       : false,
            confirmPassword     : '',
            cnicBackVerified    : false,
            passwordVerified    : false,
            cnicFrontVerified   : false
        }
    }

    componentWillReceiveProps(props) {
        
        if (props.isRegister) {
            this.props.navigate('SignUpComplete')
        }
        console.log(this.props.error);
    }

    _pickImage = async ( type ) => {

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
      
        if( type == 'front') {
            this.setState({ frontimage: pickerResult },()=>this.setState({cnicFrontVerified:true}));
        } else {
            this.setState({ backimage: pickerResult }, ()=>this.setState({cnicBackVerified:true}));
        }
      }

      validate(text,type){
        alf=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        num=/(?=.{8,})/
        phonenum=/(?=.{11,})/
        if(type=='email'){
          this.setState({email:text});
          if(alf.test(text)){
            
            this.setState({emailVerified:true});
          }
          else{
            this.setState({emailVerified:false});
          }
        }
        else if(type=='password'){
          this.setState({password:text});
          if(num.test(text)){
            
            this.setState({passwordVerified:true})
          }
          else{
            this.setState({passwordVerified:false})
          }
        }
        else if(type=='phone'){
          this.setState({phone:text});
          if(phonenum.test(text)){
            
            this.setState({phoneVerified:true})
          }
          else{
            this.setState({phoneVerified:false})
          }
        }
      }

      
     async onValueChange(value) {
        console.log('Service is: '+value);
        this.setState({
          servicename: value
        }, ()=>console.log('Service name from state is '+this.state.servicename));
      }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Name"
                    returnKeyType="next"
                    style={styles.input}
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.emailInput.focus()}
                    onChangeText={value => this.setState({ name: value.trim() })}
                />
                <TextInput
                    placeholder="Email"
                    returnKeyType="next"
                    style={[!this.state.emailVerified?styles.inputerror:styles.input]}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    ref={(input) => this.emailInput = input}
                    onSubmitEditing={() => this.phoneInput.focus()}
                    value={this.state.email}
                    onChangeText={(value) =>this.validate(value,'email')}
                />
                <TextInput
                    placeholder="Number"
                    returnKeyType="next"
                    style={[!this.state.phoneVerified?styles.inputerror:styles.input]}
                    keyboardType="name-phone-pad"
                    autoCorrect={false}
                    ref={(input) => this.phoneInput = input}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    value={this.state.phone}
                    onChangeText={(value) =>this.validate(value,'phone')}
                />
                <TextInput
                    placeholder="Password"
                    returnKeyType="go"
                    style={[!this.state.passwordVerified?styles.inputerror:styles.input]}
                    secureTextEntry={true}
                    ref={(input) => this.passwordInput = input}
                    onSubmitEditing={() => this.cnicInput.focus()}
                    value={this.state.password}
                    onChangeText={(value) =>this.validate(value,'password')}
                />
                <TextInput
                    placeholder="CNIC #"
                    returnKeyType="next"
                    style={styles.input}
                    keyboardType="name-phone-pad"
                    autoCorrect={false}
                    ref={(input) => this.cnicInput = input}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={value => this.setState({ cnic: value.trim() })}
                />
                <Text style={styles.cnictext}>
                    Upload CNIC :
                </Text>
                <View style={styles.cnicSides}>
                    <TouchableOpacity 
                    style={styles.cnicBtn} 
                    onPress={()=>this._pickImage('front')}
                    >
                        <Text style={this.state.cnicFrontVerified?styles.frontSideSuccess:styles.frontSide}>
                        {this.state.cnicFrontVerified?'Front Side selected':'Front Button'}
                        </Text>    
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.cnicBtn} 
                    onPress={()=>this._pickImage('back')}
                    >
                        <Text style={this.state.cnicBackVerified?styles.backSideSuccess:styles.backSide}>
                        {this.state.cnicBackVerified?'Back Side selected':'Back Button'}
                        </Text>    
                    </TouchableOpacity>

                </View>
                <Text style={styles.cnictext}>
                        Select services :
                    </Text>
                <View style={styles.serviceSelect}>
                    
                    <Picker
                            mode="dropdown"
                            placeholder="Services"
                            selectedValue={this.state.servicename}
                            style={{ height: 50, width: 150, justifyContent:'center', color:'white'}}
                            onValueChange={()=>this.onValueChange.bind(this)}>
                            <Picker.Item label='Select...' />
                            <Picker.Item label="Painter" value="painter" />
                            <Picker.Item label="UPS repairing" value="ups repairing" />
                            <Picker.Item label="Electrician" value="electrician" />
                            <Picker.Item label="Air Conditioner" value="air conditioner" />
                            <Picker.Item label="Home Cleaner" value="home cleaner" />
                            <Picker.Item label="Plumber" value="plumber" />
                            <Picker.Item label="Carpenter" value="carpenter" />
                            <Picker.Item label="Decoraiton" value="decoration" />
                    </Picker>
                </View>
                <View style={styles.checkBoxContainer}>
                <CheckBox value={this.state.checked}
                    onValueChange={() => this.setState({ checked: !this.state.checked })} 
                />
                <Text> you agree to terms and conditions </Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.props.onsubmit(this.state)}
                    disabled={this.state.cnicFrontVerified && this.state.cnicBackVerified && this.state.passwordVerified && this.state.phoneVerified ? false : true}
                >
                    <Text style={styles.themebtn}>
                        SIGNUP
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '5%'
    },
    input: {
        height: '9%',
        marginVertical: '1.5%',
        backgroundColor: 'transparent',
        borderRadius: 5,
        paddingVertical: '1.5%',
        width: '100%',
        borderColor: '#125c94',
        borderWidth: 2.5,
        fontSize: 18,
        color: '#747474',
        padding: '5%'
    },
    inputerror: {
        height: '9%',
        marginVertical: '1.5%',
        backgroundColor: 'transparent',
        borderRadius: 5,
        paddingVertical: '1.5%',
        width: '100%',
        borderColor: 'red',
        borderWidth: 2.5,
        fontSize: 18,
        color: '#747474',
        padding: '5%'
    },
    buttonContainer: {
        alignItems: 'center',
        width: '100%',
        height: '9%'
    },
    themebtn: {
        backgroundColor: '#125c94',
        borderRadius: 5,
        color: '#fff',
        fontSize: 18,
        padding: '3%',
        width: '100%',
        height: '100%',
        textAlign: 'center'
    },
    checkBoxContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: hp('1%')
    },
    pickerStyle: {
        height: '10%',
        marginVertical: '2%',
        backgroundColor: 'transparent',
        borderRadius: 5,
        paddingVertical: '2%',
        width: '100%',
        borderColor: '#125c94',
        borderWidth: 2.5,
        color: '#747474',
        padding: '5%'
    },
    imgBtn:{
        width:wp('10%'),
        height:hp('10%'),
        paddingLeft:20
    },
    cnictext:{
        width: '100%',
        justifyContent: 'flex-start',
        color:'#125c94'
    },
    cnicSides:{
        width: '100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    servicetext:{
        color:'#125c94',
        fontSize:14,
        justifyContent: 'flex-start'
    },
    buttonstext:{
        backgroundColor: '#125c94',
        borderRadius: 5,
        color: '#fff',
        fontSize: 18,
        padding: '3%',
        width: '100%',
        height: '100%',
        textAlign: 'center'
    },
    cnicContainer:{
        alignItems: 'center',
        width: '50%',
        height: '28%',
        justifyContent: 'center'
    },
    serviceSelect:{
        width: '100%',
        justifyContent:'flex-start',
        flexDirection:'row',
        backgroundColor: '#125c94',
        borderRadius: 5
    },
    frontSide:{
        backgroundColor: '#125c94',
        fontSize:13.5,
        width:wp('43%'),
        textAlign:'center',
        color:'white',
        height:hp('7%'),
        borderRadius:5,
        marginLeft:'1%',
        textAlignVertical:'center'
    },
    backSide:{
        backgroundColor: '#125c94',
        fontSize:13.5,
        width:wp('43%'),
        textAlign:'center',
        color:'white',
        height:hp('7%'),
        borderRadius:5,
        marginLeft:'1%',
        textAlignVertical:'center'
    },
    frontSideSuccess:{
        backgroundColor: '#32CD32',
        fontSize:13.5,
        width:wp('43%'),
        textAlign:'center',
        color:'white',
        height:hp('7%'),
        borderRadius:5,
        marginLeft:'1%',
        textAlignVertical:'center'
    },
    backSideSuccess:{
        backgroundColor: '#32CD32',
        fontSize:13.5,
        width:wp('43%'),
        textAlign:'center',
        color:'white',
        height:hp('7%'),
        borderRadius:5,
        marginLeft:'1%',
        textAlignVertical:'center'
    },
    cnicBtn:{
        justifyContent: 'center',
        alignItems:'center'
    }
});