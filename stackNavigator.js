import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { 
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
// importing components
import Home from './src/containers/home/home';
import Main from './src/containers/main/main';
import Login from './src/containers/login/login';
import Signup from './src/containers/signup/signup';
import Profile from './src/containers/profile/profile';
import Welcome from './src/containers/welcome/welcome';
import ForgotPassword from './src/containers/forgotPassword/forgotPassword';
import DrawerButton from './src/components/menuButton';
import selectAgreement from './src/containers/selectAgreement/selectAgreement';
import BackButton from './src/components/goBack';
import MapContainer from './src/containers/mapContainer/mapContainer';
import AvailableProvider from './src/containers/availableProvider/availableProvider';
import InitAgreement from './src/containers/initAgreement/initAgreement';
import ChangeAgreement from './src/containers/changeAgreement/changeAgreement';
import AgreementTime from './src/containers/agreementTime/agreementTime';
import AgreementComplete from './src/containers/agreementComplete/agreementComplete';
import AgreeFixPrice from './src/containers/agreeFixPrice/agreeFixPrice';
import AgreeFixTrack from './src/containers/agreeFixTrack/agreeFixTrack';
import PauseAgreement from './src/containers/pauseAgreement/pauseAgreement.js';
import AgrementFinal from './src/containers/agreementFinal/agreementFinal';
import SignUpComplete from './src/containers/signUpComplete/signUpComplete';
import EnableGPS from './src/components/gpsScreen';
import AuthLoadingScreen from './src/components/authCheck';
import SwtichNavigator from './src/components/signup-wizard/switchNavigator'
import Timer from './src/containers/timerContainer/timerContainer'

const Application = createStackNavigator({
    Auth: { screen: AuthLoadingScreen,
      navigationOptions: {
        header: null
        }
    },
    Timer: { screen: Timer,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#02abb0',
          height: hp('4%'),
          paddingBottom: hp('2%')
        },
        headerLeft: <DrawerButton navigation={navigation} />,
        headerRight: <BackButton navigation={navigation} />

    })
    },
    Login: { screen: Login, 
      navigationOptions: {
      header: null
      } 
    },
    Signup: { screen: SwtichNavigator,
      navigationOptions: {
        header: null
      }
    },
    ProfileScreen: { 
      screen: Profile, 
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#125C94',
          height: heightPercentageToDP('4%'),
          paddingBottom: heightPercentageToDP('2%')
        },
        headerLeft: <DrawerButton navigation={navigation} />,
        headerRight: <BackButton navigation={navigation} />

    })
    }, 
    GPSscreen: { screen: EnableGPS,
      navigationOptions: ({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#125C94',
            height: hp('4%'),
            paddingBottom: hp('2%')
          },
          headerLeft: <DrawerButton navigation={navigation} />,
          headerRight: <BackButton navigation={navigation} />
      })
  },
    ForgotPassword: { screen: ForgotPassword,
      navigationOptions: {
        header: null
      } 
    },  
    SignUpComplete: { screen: SignUpComplete,
      navigationOptions: {
        header: null
      }
    },
    selectAgreement: { screen: selectAgreement,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <DrawerButton navigation={navigation} />,
            headerRight: <BackButton navigation={navigation} />
        }) 
    },
    MapView: { screen: MapContainer,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#125C94',
              height: hp('4%'),
              paddingBottom: hp('2%')
            },
            headerLeft: <DrawerButton navigation={navigation} />
        })
    },        
    availableProvider: { screen: AvailableProvider,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
        headerRight: <BackButton navigation={navigation} />

    })
    },
    initAgreement: { screen: InitAgreement,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
        headerRight: <BackButton navigation={navigation} />
    })
    },
    ChangeAgreement: { screen: ChangeAgreement,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
        headerRight: <BackButton navigation={navigation} />
    })
    },
    AgreementTime: { screen: AgreementTime,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
        headerRight: <BackButton navigation={navigation} />
    })
    },
    AgreementComplete: { screen: AgreementComplete,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
        headerRight: <BackButton navigation={navigation} />
    })
    },
    AgreeFixPrice: { screen: AgreeFixPrice,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
        headerRight: <BackButton navigation={navigation} />
    })
    },
    AgreeFixTrack: { screen: AgreeFixTrack,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
        headerRight: <BackButton navigation={navigation} />
    })
    },
    PauseAgreement:  { screen: PauseAgreement,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
        headerRight: <BackButton navigation={navigation} />
    })
    },
    AgrementFinal: { screen: AgrementFinal,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />,
        headerRight: <BackButton navigation={navigation} />
    })
    },
  });

export default Application;
