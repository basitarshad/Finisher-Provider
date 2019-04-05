import { ImagePicker } from 'expo';
import { connect } from 'react-redux';
import React, { Component } from 'react'
import {Image , View, Text, StyleSheet} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BackgroundComponent, AppSuccessButton, LogoComponent } from '../../../components';
import icon from '../../../assets/images/user.png';
import * as actions from '../../store/actions/auth';

class ProfileImage extends Component{

    constructor(props){
        super(props);
        this.state = {
            imageResult     : null,
            imageRef        : '',
            imageSelected   : false,
            userImage       : '',
            imagescreenConfirm  : true
        }
        this.storeProfileImage = this.storeProfileImage.bind(this);
    }

    selectImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing : true,
            aspect  : [1,1],
            base64  : true,
            quality : 0.5
        });

        if(!result.cancelled){
            this.setState({userImage: result.uri, imageResult : result, imageSelected: true});
        }
    }

    storeProfileImage () {
        console.log("saving image")
        this.props.saveProfileImage(this.state.imageResult);
        this.props.navigation.navigate('UploadCnic');
    }
    
    render(){
        return(
            <BackgroundComponent>
                <LogoComponent />
                <View style={{ justifyContent: 'center', alignItems: 'center', height: hp('85%'), width: wp('100%')}}>
                    <Image
                        style   = {{width: wp('55%'), height: hp('30%'), borderRadius: wp('60%')/2, marginVertical: hp('2%')}}
                        source  = { this.state.imageResult ? this.state.imageResult : icon }
                    />
                    <AppSuccessButton
                        onPress     = {()=>this.selectImage()}
                    >Select Image</AppSuccessButton>
                    <AppSuccessButton
                        disabled    = { this.state.imageSelected ? false : true}
                        onPress     = { ()=>this.storeProfileImage() }
                    >Proceed</AppSuccessButton>
                </View>
            </BackgroundComponent>
        );
    }
}

export default connect(null, actions)(ProfileImage);
const styles = StyleSheet.create({
    
});