import React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// import store from './src/store/createStore';
import Application from './stackNavigator';
import sideMenu from './src/components/sideMenu';
import store from './src/store/createStore';

const drawnev = createDrawerNavigator({
  Item1: {
    screen: Application
  }
  }, {
  contentComponent: sideMenu,
  drawerWidth: wp('80%')
});

const AppContainer = createAppContainer(drawnev);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Provider store={store}>
            <AppContainer />
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/AppIcon.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'Myriad-Pro-Bold'     : require('./assets/fonts/Myriad-Pro.ttf'),
        'Myriad-Pro-Regular'  : require('./assets/fonts/Myriad-Pro-Regular.otf'),
        'Myriad-Pro-Light'    : require('./assets/fonts/Myriad-Pro-Light.otf')
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
