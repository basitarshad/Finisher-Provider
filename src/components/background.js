import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

// importing background Image
import backgroundImage from '../../assets/images/banner-login.jpg';

export default class Logo extends Component {
  render() {
    return (      
        <ImageBackground 
        source={backgroundImage}
        />
    );
  }
}
