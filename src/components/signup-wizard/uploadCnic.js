import React, {Component} from 'react'
import {Image , View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagePicker, LinearGradient } from 'expo';
import { BackgroundComponent, LogoComponent, AppInputField, AppSuccessButton } from '../../../components';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
class UploadCnic extends Component{    

    constructor(props){
        super(props);
        this.state = {
            cnic        : '',
            imageRef    : '',
            frontimage  : '',
            backimage   : '',
            userImage   : '',
            cnicVerified        : true,
            backimageResult     : null,
            frontImageResult    : null,
            backimageselected   : false,
            frontimageSelected  : false
        }
        this.uploadCNIC = this.uploadCNIC.bind(this);
    }

    selectImage = async(type)=> {
        let result = await ImagePicker.launchImageLibraryAsync({
            aspect  : [1, 1],
            allowsEditing : true,
            quality : 1.0,
            base64  : true
        });

        if(type == 'front'){ 
            this.setState({frontimage: result.uri, frontImageResult : result, frontimageSelected: true});
        }
        else{
            this.setState({backimage: result.uri, backimageResult : result},
                ()=>this.setState({backimageselected:true},
                    ()=>console.log('backimage true')));
        }
    };

    uploadCNIC () {
        let body = {};
        body.backimageResult    = this.state.backimageResult;
        body.frontImageResult   = this.state.frontImageResult;
        body.cnic               = this.state.cnic;
        this.props.saveCnicImages(body);
    };

    componentWillReceiveProps (nextProps) {
        if(nextProps.isRegister){        
            this.props.navigation.navigate('SignUpComplete');
        }
    }

    validate(text,type){
        alf = /\d{5}-\d{7}-\d{1}$/
        if(type=='cnic'){
          this.setState({ cnic: text });
          if(alf.test(text))
            this.setState({cnicVerified:true});
          else
            this.setState({cnicVerified:false});
        }
    }

    render(){
        return(
            <BackgroundComponent>
                <LinearGradient colors={["#09ABB3","#09ABB3", "#16B0B0", "#1EB5B1"]} style={{ height: hp('25%'), width: wp('100%'), alignItems: 'center'}}>
                    <LogoComponent />
                    <Text style={{ fontFamily: 'Myriad-Pro-Regular', fontSize: hp('3%'), color: '#FDFDFD', fontWeight: '500' }}>
                        UPLOAD CNIC 
                    </Text>
                    <Text style={{ fontFamily: 'Myriad-Pro-Regular', fontSize: hp('2.8%'), color: '#FDFDFD', fontWeight: '400', marginTop: hp('1%') }}>
                        Please upload your cnic copies carefully 
                    </Text>
                </LinearGradient> 
                <View style={styles.formContainer}>
                    <ScrollView showsVerticalScrollIndicator = {false} style={{ paddingHorizontal: wp('4%')}}>
                        <Text style={styles.header}>
                            What's your CNIC? (xxxxx-xxxxxxx-x)
                        </Text>
                        <AppInputField 
                            placeholder     = 'CNIC'
                            keyboardType    = 'numbers-and-punctuation'
                            value           = { this.state.cnic }
                            onChangeText    = { (value) =>this.validate(value,'cnic') }
                        />
                        <View style={{flexDirection: 'row', width: hp('80%'), justifyContent: 'flex-start', marginVertical: hp('1.5%')}}>
                            <AppSuccessButton
                                style       = {{width: wp('35%'), marginHorizontal: wp('2%')}}
                                buttonStyle = {{backgroundColor : '#bf8548'}}
                                onPress     = { ()=> this.selectImage('front') }
                            >Upload Front
                            </AppSuccessButton>
                            <AppSuccessButton
                                style       = {{width: wp('35%'), marginHorizontal: wp('2%')}}
                                buttonStyle = {{backgroundColor : '#bf8548'}}
                                onPress     = { ()=> this.selectImage('back') }
                            >Upload Back
                            </AppSuccessButton>
                        </View>
                        <View>

                        </View>
                        <View style={{flexDirection: 'row', width: hp('90%'), justifyContent: 'flex-start', marginVertical: hp('1.5%')}}>
                            <Image
                                style   = {{width: wp('41%'), height: hp('27%'), marginRight: wp('1%'), borderColor: '#13AFB2', borderWidth: 2, borderRadius: 6, marginVertical: hp('0.5%')}}
                                source  = { this.state.frontImageResult ? this.state.frontImageResult : null }
                            />
                            <Image
                                style   = {{width: wp('41%'), height: hp('27%'), borderColor: '#13AFB2', borderWidth: 2, borderRadius: 6, marginVertical: hp('0.5%')}}
                                source  = { this.state.backimageResult ? this.state.backimageResult : null }
                            />
                        </View>
                        <AppSuccessButton
                            disabled    = { this.state.backimageselected ? false : true }
                            onPress     = { () => this.uploadCNIC() }
                        >Submit
                        </AppSuccessButton>
                    </ScrollView>
                </View>
            </BackgroundComponent> 
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        isRegister: authReducer.isRegister
    };
};
export default connect(mapStateToProps, actions)(UploadCnic);
const styles = StyleSheet.create({
    formContainer: {
        flex            : 1,
        alignItems      : 'center', 
        justifyContent  : 'center', 
        width           : wp('100%'), 
        height          : hp('75%'),
        paddingVertical : wp('1%'),
        paddingHorizontal : wp('1%'),
        backgroundColor : '#FDFDFD'
    },
    header:{
        width           : wp('90%'),
        height          : hp('5%'),
        color           : '#13AFB2',
        fontSize        : hp('2.7%'),
        fontWeight      : '500',
        fontFamily      : 'Myriad-Pro-Regular',
        marginTop       : hp('0.5%')
    }
});