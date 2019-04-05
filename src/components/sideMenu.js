import React from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';

import PropTypes from 'prop-types';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';

// importing images
import userDummy from '../../assets/images/user-dummy.png';

// importing icons
'../../assets/images/'
import helpIcon from '../../assets/images/sidemenuIcons/help.png';
import homeIcon from '../../assets/images/sidemenuIcons/home.png';
import settingsIcon from '../../assets/images/sidemenuIcons/settings.png';
import contractsIcon from '../../assets/images/sidemenuIcons/contracts.png';
import notificationsIcon from '../../assets/images/sidemenuIcons/notifications.png';

class SideMenu extends React.Component {
    navigateToScreen = (route) => () => {
      const navigateAction = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(navigateAction);
    }
    
    logout() {
      AsyncStorage.removeItem('auth');
      AsyncStorage.removeItem('userInfo')
      this.props.navigation.navigate('Login');
  };
  

    render() {
      return (
        <View style={styles.container}>            
          <View style={styles.sideMenuHeadingStyle}>
          <Image source={userDummy} style={styles.imageStyle}/>
            <Text style={styles.nameText}>
              Adnan Shuja
            </Text>
          </View>
          <View style={styles.sideMenuBodyStyle}>
            <View style={styles.titleContainer}>
              <Image source={homeIcon} style={styles.iconImage} />
              <Text style={styles.titleText}>
                Home
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Image source={contractsIcon} style={styles.iconImage} />
              <Text style={styles.titleText}>
                  Contracts                
              </Text>             
            </View>
            <View style={styles.titleContainer}>
              <Image source={notificationsIcon} style={styles.iconImage} />
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Timer')}>
                <Text style={styles.titleText}>
                    Notifications
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <Image source={settingsIcon} style={styles.iconImage} />
              <Text style={styles.titleText}>
                  Settings                
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Image source={helpIcon} style={styles.iconImage} />
              <Text style={styles.titleText}>
                  Help
              </Text>
            </View>
            <TouchableOpacity onPress={() => {this.logout()}}>
              <Text style={styles.themebtn}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  
  SideMenu.propTypes = {
    navigation: PropTypes.object
  };
  
const styles = StyleSheet.create({
    container: {
        height: hp('100%'),
        flex: 1
      },
      sideMenuHeadingStyle: {
        paddingBottom: hp('2'),
        paddingHorizontal: wp('7%'),
        height: hp('33%'),
        width: wp('80%'),
        backgroundColor: '#125c94',
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      imageStyle: {
        height: hp('18%'),
        width: wp('30%')
      },
      nameText: {
        paddingTop: hp('1%'),
        fontSize: hp('4%'),
        color: '#fff',
        fontWeight: '400'
      },
      sideMenuBodyStyle: {
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('3%')
      },
      iconsContainer: {
        marginHorizontal: wp('2%'),
        width: wp('5%')
      },
      titleContainer: {
        marginVertical: hp('2%'),
        width: wp('60%'),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
      iconImage: {
        tintColor: '#125c94',
        height: hp('5%'),
        width: wp('8%'),
        marginHorizontal: wp('5%')
      },
      titleText: {
        fontSize: hp('3%'),
        color: 'black'
      },
      footerContainer: {
        padding: hp('10%'),
        backgroundColor: 'lightgrey'
      },
      themebtn: {
        backgroundColor: '#125c94',
        borderColor: 'white',
        borderRadius: 6,
        color: '#fff',
        fontSize: hp('3%'),
        width: wp('60%'),
        height: hp('7%'),
        textAlign: 'center',
        padding: hp('1%'),
        marginTop: hp('5%')
      }
});

export default SideMenu;
