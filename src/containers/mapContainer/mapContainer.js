import React, { Component } from 'react';
import { 
    View, 
    StyleSheet, 
    TextInput,
    TouchableOpacity,
    Text,
    AsyncStorage
} from 'react-native';
import { MapView } from 'expo';
import { 
    heightPercentageToDP as hp, 
    widthPercentageToDP as wp 
} from 'react-native-responsive-screen';
import FinisherMapView from '../../components/mapView';
import {
    getCurrentLocation,
    updateLocationOnServer,
    updateLocation
} from "../../store/reducers/user-location"; 
import { onAcceptAgreement,closeRequestModal } from '../../store/reducers/initiate_agreement';
import { connect } from 'react-redux';
import { Constants, Location, Permissions } from 'expo';


class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state= { provider: {} }
    }
    _getLocationAsync= async()=> {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          "error"
          return
        }
        let gpsServiceStatus = await Location.hasServicesEnabledAsync();
        if (gpsServiceStatus) {
          let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false, timeout: 5000, maximumAge: 3600000});
          return location
        }
        else
          return false
      }


    componentDidMount() {
        let result = this._getLocationAsync()
        result.then(res=>{
            this.props.getCurrentLocation(res);
        }).catch(err=>{
            console.log(err);
        })
        AsyncStorage.getItem('userInfo').then((response) => {
            if( response ) {
                const res = JSON.parse(response);
                const { provider } = res;
                this.setState({ provider });
            }            
          });
    }

    sendLocation(e){
        const {_id}= this.state.provider
        this.props.updateLocation(e);
        this.props.updateLocationOnServer({location:e, providerId:_id,  userType:'provider'})
    }

    handleAgreement(){
        var data = {};
        data = this.props.customerInfo;
        data.region = this.props.region;
        this.props.onAcceptAgreement(data);
    }
    closeRequestModal(){
        this.props.closeRequestModal();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mapcontainer}>
                {this.props.region.latitude &&
                    <FinisherMapView 
                        region              = { this.props.region }
                        sendLocation        = { this.sendLocation.bind(this) }
                        customerInfo        = { this.props.customerInfo }
                        customerLocation    = { this.props.customerLocation }
                        gotAgreementRequest = { this.props.gotAgreementRequest }
                        isRequestModalOpen  =  {this.props.isRequestModalOpen}
                        handleAgreement     = { () => this.handleAgreement() }
                        closeRequestModal   = { ()=>this.closeRequestModal()}
                    ></FinisherMapView>
                    }          
                </View>
            </View>            
        );
    }
}

const mapStateToProps = ({ locationReducer, authReducer, startAgreementReducer }) => ({
    region              : locationReducer.region,
    userInfo            : authReducer.userInfo,
    customerInfo        : startAgreementReducer.customerInfo,
    customerLocation    : startAgreementReducer.customerLocation,
    gotAgreementRequest : startAgreementReducer.gotAgreementRequest,
    isRequestModalOpen    : startAgreementReducer.isRequestModalOpen
});
const mapActionCreators = {
    updateLocation,
    onAcceptAgreement,
    getCurrentLocation,
    updateLocationOnServer,
    closeRequestModal
};


export default connect(mapStateToProps, mapActionCreators)(MapContainer);

const styles = StyleSheet.create({
    container: {
        height: hp('100%')
    },
    mapcontainer: {
        height: hp('90%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    inputContainer: {
        height: hp('16%'),
        color: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    input: {                
        marginHorizontal: wp('8%'),
        marginVertical: hp('1%'),
        height: hp('6%'), 
        backgroundColor: 'transparent',
        borderRadius: 5, 
        paddingVertical: hp('1%'),
        width: wp('75%'),
        borderColor: '#125c94',
        borderWidth: 2.5,
        fontSize: hp('2%'),
        color: '#747474',
        padding: '5%'
    },
    themebtn: {
        marginHorizontal: wp('8%'),
        marginVertical: hp('1%'),
        backgroundColor: '#125c94',
        borderColor: 'white',
        borderRadius: 6,
        color: '#fff',
        fontSize: hp('1.8%'),
        width: wp('40%'),
        height: hp('5%'),
        textAlign: 'center',
        padding: hp('1%'),
        marginTop: hp('1%')
      }
});
