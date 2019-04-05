import {connect} from 'react-redux';
import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Text, StatusBar } from 'react-native';
// importing logo Image Componentt
import LogoComponent from '../../components/logo';
// image background
import { checkPhoneNumber } from '../../store/actions/auth';
import BackgroundImage from '../../../assets/images/banner-login.jpg';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

class ForgotPassword extends Component {

    constructor(props){
        super(props);
        this.state={
            phone:'',
            confirmPin:false,
            pin:''
        }
    }

    onSubmit() {
        this.props.checkPhoneNumber(this.state.phone);
    }

    componentWillReceiveProps(){
        if(phoneFound==true){
            this.setState({confirmPin:true});
        }
    }

    render() {
        return (
            <ImageBackground source={BackgroundImage} style={{ width: '100%' }}>
            <StatusBar backgroundColor="#125c94" barStyle="light-content" />
            <View style={styles.container}>
                <LogoComponent />
                {this.state.confirmPin?
                (<Text style={styles.headingTextPin}>
                    Confirm PIN
                </Text>):
                (<Text style={styles.headingText}>
                    Enter your phone number
                </Text>)}
                {this.state.confirmPin?
                (<TextInput 
                style={styles.phoneInputPin}
                placeholder="ENTER 4-Digit PIN"
                keyboardType="name-phone-pad"
                placeholderTextColor="#a38181"
                returnKeyType="next"
                onChangeText={value => this.setState({ pin: value.trim() })}
                />):
                (<TextInput 
                style={styles.phoneInput}
                placeholder="Phone Number"
                keyboardType="name-phone-pad"
                placeholderTextColor="#a38181"
                returnKeyType="next"
                onChangeText={value => this.setState({ phone: value.trim() })}
                />)}

            {this.state.confirmPin?
            (<TouchableOpacity style={styles.submitBtn}>
                <Text style={styles.submitText}>Confirm PIN</Text>
            </TouchableOpacity>):
            (<TouchableOpacity style={styles.submitBtn} onPress={()=>this.onSubmit()}>
            <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>)}
            </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        phoneFound: authReducer.phoneFound    
    };
};

const mapDispatchToProps = () => {
    checkPhoneNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        height: '100%',
        padding: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        fontSize: 24,
        color: 'black',
        fontWeight: '300'
    },
    bottomText: {
        fontSize: 14, 
        color: 'black',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '80%'
    },
    phoneInput: {
        height: hp('8%'),
        marginVertical: '2%',
        backgroundColor: 'transparent',
        borderRadius: 5,
        paddingVertical: '2%',
        width: wp('80%'),
        borderColor: '#125c94',
        borderWidth: 2.5,
        fontSize: 14,
        color: '#747474',
        padding: '5%'
    },
    submitBtn:{
        alignItems: 'center',
        width: '100%',
        height: '70%',
        justifyContent:'flex-end'
    },
    submitText:{
        backgroundColor: '#125c94',
        borderRadius: 5,
        color: '#fff',
        fontSize: 18,
        padding: '3%',
        width: wp('100%'),
        height: hp('100%'),
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        height: '12%'
    },
    headingTextPin: {
        fontSize: 24,
        color: 'red',
        fontWeight: '300',
        fontWeight:'bold'
    },
    phoneInputPin: {
        height: hp('8%'),
        marginVertical: '2%',
        backgroundColor: 'transparent',
        borderRadius: 5,
        paddingVertical: '2%',
        width: wp('80%'),
        borderColor: '#125c94',
        borderWidth: 2.5,
        fontSize: 14,
        color: '#747474',
        padding: '5%'
    }
});
