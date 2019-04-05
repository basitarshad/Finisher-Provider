import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, Alert, Modal, TouchableHighlight, Button, Dimensions } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { MapView, Location, Permissions, Linking, Audio } from 'expo';
import { connect } from 'react-redux';
// importing logo 
import logoImage from '../../assets/images/logo.png';
import call from '../../assets/images/callicon.png';
import userDummy from '../../assets/images/user-dummy.png';
import { Dialog } from 'react-native-simple-dialogs';
import troffy from '../../assets/images/troffy.jpeg';
import sad from '../../assets/images/sademoji.png'
import { MapViewDirections } from './mapViewDirections'
const GOOGLE_MAPS_APIKEY = 'AIzaSyDqYvGztDs7kXNOqKHbJqNyz2RQO_hw-78';
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;


export default class FinisherMapView extends Component {
  constructor(props) {
    super(props);
    // all the state variables
    this.state = {
      currentLat: '',
      currentLong: '',
      showConsumer: false,
      modalVisible: false,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      customerInfo: {},
      currentlocation: { latitude: 0, longitude: 0 },
      customerlocation: {},
      alertModal: false,
      dialogVisible: false,
      congratsDialog: false,
      unsuccessDialog: false,
      gotService: false,
      customerSuccess: '',
      showDialogConfirm: true,

    }
    this.mapView = null
  }

  componentDidMount() {
    this._getLocationAsync();

    Location.watchPositionAsync({ timeInterval: 2000 }, (result) => {
      this.props.sendLocation(result);
      this.setCoords(result);
    })
  }


  setCoords(temp) {
    var lat = parseFloat(temp.latitude);
    var long = parseFloat(temp.longitude);

    this.setState({
      currentlocation: {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0171,
        longitudeDelta: 0.0108
      }
    })
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location });

    this.setState({ currentLat: location.coords.latitude, currentLong: location.coords.longitude });

    var lat = parseFloat(this.state.currentLat);
    var long = parseFloat(this.state.currentLong);
    this.setState({
      currentlocation: {
        latitude: lat,
        longitude: long,
        modalVisible: false,
        latitudeDelta: 0.0171,
        longitudeDelta: 0.0108
      }
    });

  }


  modalClose = async () => {
    console.log('check 1')
    Alert.alert(
      'Confirmation Message',
      'Customer has been notified about arrival!',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
        { text: '', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )
  }

  playAudio = async () => {
    let soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(require('../../assets/ringtone/notification.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  stopAudio = async () => {
    await this.soundObject.stopAsync();
  }

  setModalVisible() {
    this.setState({ congratsDialog: true });
  }

  unsucessDialog() {
    this.setState({ unsuccessDialog: true });
  }

  handleAgreementRequest() {
    this.props.handleAgreement();
  }

  componentWillReceiveProps(newProps) {
    console.log("componentWillRecievecalled", newProps.gotAgreementRequest)
    if (newProps.gotAgreementRequest) {
      this.playAudio()
      this.setState({
        customerInfo: newProps.customerInfo,
      })

    }
    if (newProps.customerLocation.coordinate) {
      console.log("got customer location=====>", newProps.customerLocation)
      this.setModalVisible()
    }
  }
  onReady = () => {
    this.mapView.fitToCoordinates(this.props.region, {
      edgePadding: {
        right: (width / 20),
        bottom: (height / 20),
        left: (width / 20),
        top: (height / 20),
      }
    });
  }

  render() {
    const { coordinate } = this.props.customerLocation
    return (
      <View style={styles.container}>
        <MapView style={this.state.showConsumer ? styles.map : styles.mapAlone} region={this.props.region} ref={c => this.mapView = c}>
          <MapView.Marker coordinate={this.props.region} pinColor="green" />
          {this.props.customerLocation.coordinate && <MapView.Marker coordinate={{ longitude: this.props.customerLocation.coordinate.coordinates[0], latitude: this.props.customerLocation.coordinate.coordinates[1] }} pinColor="blue" />}
          {/* {this.props.customerLocation.coordinate && <MapViewDirections
            origin={this.props.region}
            destination={{ longitude: coordinate.coordinates[0], latitude: coordinate.coordinates[1] }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={this.onReady}
          />} */}
        </MapView>

        {/* Service request modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.isRequestModalOpen}
          onRequestClose={() => console.warn('hi')}
        >
          <View style={styles.modal}>
            <View style={styles.modalBody}>
              <View style={styles.heading}>
                <Text style={styles.headingText}> Customer Service Request </Text>
              </View>
              <View style={styles.infoContainer}>
                <View style={{ flexDirection: 'row', height: hp('10%') }}>
                  <Image style={{ width: wp('10%'), height: hp('7%') }} source={userDummy} />
                  <View style={{ paddingHorizontal: wp('1%') }}>
                    <Text> {this.props.customerInfo.name}</Text>
                  </View>
                </View>
                <Text>Address:{this.props.customerInfo.address}</Text>
                <Text>Service type: {this.props.customerInfo.agreement_type}</Text>
                <Text>Service: {this.props.customerInfo.category}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonDecline} onPress={() => this.props.closeRequestModal()}>
                  <Text style={styles.declinebutton}> Decline </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonAccept} onPress={() => this.handleAgreementRequest()}>
                  <Text style={styles.acceptutton}> Accept </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Congratulations dialog */}
        <Dialog
          visible={this.state.congratsDialog}
          onTouchOutside={() => this.setState({ congratsDialog: false })} >
          <View style={{ justifyContent: "center", alignItems: 'center' }}>
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'green',
              fontSize: 20
            }}>
              CONGRATULATIONS!
                              </Text>
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              marginTop: '5%'
            }}>
              You have been awarded by this Service...
                              </Text>
            <Image
              style={{
                justifyContent: 'center',
                width: wp('10%'),
                height: hp('7%'),
                alignItems: 'center',
                marginTop: '5%'
              }}
              source={troffy}
            />
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: '5%',
              color: 'red'
            }}>
              *** HAPPY AGREEMENT ***
                              </Text>
            <Button
              title={'OK'}
              onPress={() => this.setState({ congratsDialog: false }, () => this.setState({ showConsumer: true }))}
            />
          </View>
        </Dialog>

        {/* Service unsuccessfull dialog */}
        <Dialog
          visible={this.state.unsuccessDialog}
          onTouchOutside={() => this.setState({ unsuccessDialog: false })} >
          <View style={{ justifyContent: "center", alignItems: 'center' }}>
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'red',
              fontSize: 20
            }}>
              OOPS!
                              </Text>
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              marginTop: '5%'
            }}>
              The service has been accepted by another provider...
                              </Text>
            <Image
              style={{
                justifyContent: 'center',
                width: wp('10%'),
                height: hp('7%'),
                alignItems: 'center',
                marginTop: '5%'
              }}
              source={sad}
            />
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: '5%',
              color: 'red'
            }}>
              *** WAIT TILL NEXT TIME ***
                              </Text>
            <Button
              title={'OK'}
              onPress={() => this.setState({ unsuccessDialog: false })}
            />
          </View>
        </Dialog>

        {/* Consumer details after getting service */}
        {this.state.showConsumer ? (<View style={styles.providerCard}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.providerImage} source={userDummy} />
            <View style={styles.providerDetail}>
              <Text>Name:{this.props.customerInfo.name}</Text>
              <Text>Address:{this.props.customerInfo.address}</Text>
            </View>
            <TouchableOpacity style={styles.callBtn}
              onPress={() => Linking.openURL(`tel:${this.props.customerInfo.phone}`)}>
              <Image source={call} style={styles.callImage} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.arriveBtn}
            onPress={() =>
              this.unsucessDialog()}
          //onPress={this.modalClose}
          >
            <Text style={styles.arriveText}>ARRIVE!</Text>
          </TouchableOpacity>
        </View>) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: wp('100%'),
    height: hp('65%')
  },
  mapAlone: {
    width: wp('100%'),
    height: hp('90%')
  },
  headerTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'blue',
    fontSize: 14
  },
  modalview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('100%')
  },
  providerCard: {
    width: wp('80%'),
    height: hp('30%'),
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%')
  },
  providerImage: {
    width: wp('20%'),
    height: hp('12%'),
    borderRadius: 10,
    paddingHorizontal: wp('2%'),
    marginTop: '5%'
  },
  providerName: {
    fontWeight: 'bold',
    fontSize: hp('2.8%')
  },
  providerDetail: {
    marginTop: '5%',
    marginLeft: '3%',
    marginTop: '7%'
  },
  providerService: {
    color: 'green',
    fontSize: 15
  },
  callImage: {
    width: wp('16%'),
    height: hp('10%')
  },
  callBtn: {
    marginTop: '8%',
    width: wp('12%'),
    height: hp('18%'),
    marginLeft: wp('13%')
  },
  arriveText: {
    backgroundColor: 'red',
    borderRadius: 5,
    color: '#fff',
    fontSize: 18,
    padding: '3%',
    width: '100%',
    height: '100%',
    textAlign: 'center'
  },
  arriveBtn: {
    alignItems: 'center',
    width: wp('80%'),
    height: hp('20%'),
    padding: '5%'
  },
  modal: {
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    width: wp('100%'),
    height: hp('100%')
  },
  modalBody: {
    height: hp('42%'),
    width: wp('100%'),
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  heading: {
    backgroundColor: 'green',
    height: hp('7%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingText: {
    color: '#fff',
    fontSize: hp('2.5%'),
    fontWeight: 'bold'
  },
  infoContainer: {
    justifyContent: 'flex-start',
    height: hp('25%'),
    padding: wp('3%')
  },
  buttonContainer: {
    height: hp('10%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp('2%'),
    width: wp('100%')
  },
  buttonAccept: {
    color: '#125c94',
    width: wp('40%'),
    height: hp('7%'),
    borderRadius: 4
  },
  buttonDecline: {
    width: wp('40%'),
    height: hp('7%'),
    color: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#125c94'
  },
  acceptutton: {
    backgroundColor: 'green',
    borderRadius: 5,
    color: '#fff',
    fontSize: 18,
    padding: '3%',
    width: '100%',
    height: '100%',
    textAlign: 'center'
  },
  declinebutton: {
    backgroundColor: 'red',
    borderRadius: 5,
    color: '#fff',
    fontSize: 18,
    padding: '3%',
    width: '100%',
    height: '100%',
    textAlign: 'center'
  }
});
