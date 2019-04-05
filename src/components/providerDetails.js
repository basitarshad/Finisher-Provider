import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class ProviderDetails extends Component {
  render() {
    return (
      <View style={styles.container}>
            <View>
                <Text style={styles.commonLabel}>Yousaf</Text>
                <Text style={styles.commonLabel}>0333-1345678</Text>
                <Text style={styles.commonLabel}>Developer</Text>
                <TouchableOpacity 
                    style={{ justifyContent: 'center', alignItems: 'center', marginTop: 60 }}
                    onPress={() => this.props.navigate('Agreement')} 
                >
                    <Text style={styles.final}>Accept Service</Text>
                </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '55%',
        backgroundColor: 'transparent'
    },
    commonLabel: {
        backgroundColor: 'rgba(46,45,44,0.7)',
        color: '#fff',
        borderRadius: 5,
        width: 300,
        marginBottom: 15,
        padding: 15,
        textAlign: 'center',
        fontSize: 20
    },
    final: {
        backgroundColor: '#06c150',
        color: '#fff',
        borderRadius: 5,
        width: 200,
        marginBottom: 15,
        padding: 15,
        textAlign: 'center',
        fontSize: 20
    }
});
