import React, { Component } from 'react';
import {connect} from 'react-redux';
import { StyleSheet, TouchableOpacity, Text, View, ImageBackground, Picker } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import * as actions from '../../store/actions';

// background Image
import ImageBg from '../../../assets/images/banner-login.jpg';
import LogoComponent from '../../components/logo';

class SelectAgreement extends Component {

    state = {
        services: [
            { service: 'Painter', serviceLabel: 'Painter' },
            { service: 'Plumber', serviceLabel: 'Plumber' },
            { service: 'Electrician', serviceLabel: 'Electrician' },
            { service: 'UPS Repairing', serviceLabel: 'UPS Repairing' },
            { service: 'Air Conditioner', serviceLabel: 'Air Conditioner' },
            { service: 'Carpenter', serviceLabel: 'Carpenter' },
            { service: 'Home Cleaner', serviceLabel: 'Home Cleaner' },
            { service: 'Decoration', serviceLabel: 'Decoration' }
        ],
        currentLabel: 'Select your currency',
        service: ''
    }
    componentWillMount(){
        const {state}= this.props.navigation;
        this.props.selectService(state.params.selectedService)
    }
    pickerChange(index) {
        // eslint-disable-next-line array-callback-return
        this.state.services.map((v, i) => {
            if (index === i) {
                this.setState({
                    currentLabel: this.state.services[index].serviceLabel,
                    service: this.state.services[index].service
                });
            }
        });
    }
    
    render() {
        const {state}= this.props.navigation;
        const selectedAgreement= state.params.selectedService;
        return (
            <ImageBackground style={styles.background} source={ImageBg}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <LogoComponent />
                    </View>
                    <View style={styles.buttonContainer}>
                    <Text style={styles.infoLabel}>
                           Selected Service: {selectedAgreement}
                    </Text>
                        <TouchableOpacity 
                        style={styles.ButtonContainer}
                        onPress={() => this.props.navigation.navigate('MapView')}
                        >
                            <Text style={styles.Button}>
                                PER HOUR
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.ButtonContainer}
                        onPress={() => this.props.navigation.navigate('MapView')}
                        >
                            <Text style={styles.Button}>
                                PER ASSIGNMENT
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('2%'),
        backgroundColor: 'transparent',
        height: hp('100%')
    },
    logoContainer: {
        height: hp('25%'),
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        height: hp('75%'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        width: wp('100%')
    },
    ButtonContainer: {
        width: wp('45%'),
        height: hp('7%'),
        margin: hp('1.5%'),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Button: {
        width: '100%',
        height: '100%',
        backgroundColor: '#125c94',
        color: '#fff',
        fontSize: hp('2%'),
        textAlign: 'center',
        paddingTop: '9%',
        borderRadius: 5
    },
    infoLabel: {
        marginVertical: hp('4%'),
        width: wp('70%'),
        height: hp('6%'),
        borderColor: '#125c94',
        borderRadius: 5,
        textAlign: 'center',
        paddingTop: hp('1.5%'),
        borderWidth: 2,
        fontSize: hp('3%')
    }
});

export default connect(null, actions)(SelectAgreement);
