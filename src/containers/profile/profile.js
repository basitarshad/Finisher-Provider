import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground,Text, Image, SafeAreaView, Dimensions,
StatusBar,ScrollView, TouchableOpacity, AsyncStorage} from 'react-native';
import { heightPercentageToDP as hp , widthPercentageToDP as wp ,SCREEN_WIDTH} from 'react-native-responsive-screen';
// import { AirbnbRating,Button } from 'react-native-elements';
import {connect} from 'react-redux'

// importing components
import ProviderProfie from '../../components/providerProfile';
import ProviderDetails from '../../components/providerDetails';

import backgroundImage from '../../../assets/images/banner-login.jpg';
import background from '../../../assets/images/background.png';
import dummy from '../../../assets/images/user-dummy.png';
import { Font } from 'expo';


class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      userInfo:null
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      georgia: require('../../../assets/fonts/Georgia.ttf'),
      regular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {this.state.fontLoaded ? (
          <ImageBackground
          source={backgroundImage}
          // eslint-disable-next-line no-sequences
          style={styles.fixed}
          >
            <ScrollView style={{ flex: 1 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={{
                    uri:
                      'https://cmsmith.com/wp-content/uploads/2017/11/team-dummy-image.jpg',
                  }}
                  style={{
                    width: hp('80%'),
                    height: hp('40%'),
                    borderRadius: 50,
                    marginTop:10
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 16,
                  marginHorizontal: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 26,
                    color: 'black',
                    fontFamily: 'bold',
                  }}
                >
                  {this.state.userInfo?this.state.userInfo.name:''}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 26,
                    color: 'green',
                    fontFamily: 'bold',
                    textAlign: 'right',
                  }}
                >
                  Male
                </Text>
              </View>
              <View style={{ flex: 1, marginTop: 20 }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 15,
                    color: 'red',
                    fontFamily: 'regular',
                    marginLeft: 40,
                  }}
                >
                  INFO
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 12,
                    marginHorizontal: 30,
                  }}
                >
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.infoTypeLabel}>Email :</Text>
                      <Text style={styles.infoTypeLabel}>CNIC :</Text>
                      <Text style={styles.infoTypeLabel}>ID :</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.infoAnswerLabel}>basit@gmail.com</Text>
                      <Text style={styles.infoAnswerLabel}>123456</Text>
                      <Text style={styles.infoAnswerLabel}>Islam</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.infoTypeLabel}>Gender :</Text>
                      <Text style={styles.infoTypeLabel}>Profession :</Text>
                      <Text style={styles.infoTypeLabel}>Phone :</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 10, marginRight: -20 }}>
                      <Text style={styles.infoAnswerLabel}>Male</Text>
                      <Text style={styles.infoAnswerLabel}>Programmer</Text>
                      <Text style={styles.infoAnswerLabel}>090078601</Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* <Button
                containerStyle={{ marginVertical: 7 }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                buttonStyle={{
                  height: 55,
                  width: SCREEN_WIDTH - 40,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                linearGradientProps={{
                  colors: ['rgba(82, 179, 217, 1)', 'rgba(82, 179, 217, 1)']
                }}
                title="SignOut"
                titleStyle={{
                  fontFamily: 'regular',
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                }}
                onPress={() => console.log('SignOut')}
                activeOpacity={0.5}
              /> */}
            </ScrollView>
          </ImageBackground>
        ) : (
          <Text>Loading...</Text>
        )}
      </SafeAreaView>
    );
    }
} 
const mapStateToProps = ({ authReducer }) => {
  return {
      userInfo: authReducer.userInfo
  };
};

export default connect(mapStateToProps, null)(Profile)

const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  infoTypeLabel: {
    fontSize: 15,
    textAlign: 'right',
    color: 'black',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
  fixed: {
      position: 'absolute',
      width: wp('100%')
  }
});
