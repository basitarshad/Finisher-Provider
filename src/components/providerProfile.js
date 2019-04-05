import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

// importing image
import dummyImage from '../../assets/images/user-dummy.png';

export default class ProviderProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.Button}>Back </Text>
        </TouchableOpacity>
        <Image source={dummyImage} />
        <Text style={styles.titleStyle}> Developer </Text>
        <View style={styles.dataContainer}>
            <View style={styles.flexStyle}>
              <Text style={styles.titleStyle}>2289</Text>
              <Text style={styles.detailsStyle}>Jobs Completed</Text>
            </View>
            <View style={styles.flexStyle}>
              <Text style={styles.titleStyle}>4.9</Text>
              <Text style={styles.detailsStyle}>rating</Text>
            </View>
            <View style={styles.flexStyle}>
              <Text style={styles.titleStyle}>2</Text>
              <Text style={styles.detailsStyle}>years</Text>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '45%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    titleStyle: {
        fontSize: 20,
        color: 'white',
        fontWeight: '900',
        paddingVertical: 5
    },
    detailsStyle: {
      fontSize: 14,
      color: 'white',
      fontWeight: '600',
    },
    flexStyle: { 
      width: '33.3%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    Button: {
      borderRadius: 5,
      paddingTop: 7,
      paddingHorizontal: 20,
      textAlign: 'center',
      fontSize: 18,
      backgroundColor: '#cfcece',
      color: '#000',
      height: 40,
      width: 90
    },
    buttonContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      width: '90%'
    },
    dataContainer: {
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'row', 
    }
});
