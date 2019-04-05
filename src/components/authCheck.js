import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Location } from 'expo';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._checkToken();
  }

  
  _checkToken = async () => {
    const userData = await AsyncStorage.getItem('auth');
    if(userData){
        let res= JSON.parse(userData);
        if(res.data.token){
          Location.hasServicesEnabledAsync().then(( status )=> {
            if( status == true ){
              this.props.navigation.navigate('MapView');
            }
            else{
              this.props.navigation.navigate('GPSscreen');
            }
          })            
        } else {
            this.props.navigation.navigate('Login');
        }
    } else {
        this.props.navigation.navigate('Login');
    }
  };


  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'blue'} style={styles.indicator}/>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicator: {

    }
})
export default AuthLoadingScreen;