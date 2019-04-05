import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class AgreementDetails extends Component {
  render() {
    return (
      <View style={styles.container}>
            <View>
                <Text style={styles.commonLabel}>Yousaf</Text>
                <Text style={styles.commonLabel}>0333-1345678</Text>
                <Text style={styles.commonLabel}>Developer</Text>
                <View 
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >                
                    <Text style={styles.commonLabel}>Developer</Text>
                    <Text style={styles.commonLabel}>Developer</Text>
                    <Text style={styles.commonLabel}>Developer</Text>
                    <Text style={styles.commonLabel}>Developer</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <View style={{ width: '40%' }}>
                            <Text style={styles.commonLabel2}>Developer</Text>
                            <Text style={styles.commonLabel2}>Developer</Text>
                            <Text style={styles.commonLabel2}>Developer</Text>
                        </View>
                        <View style={{ width: '40%' }}>
                            <Text style={styles.commonLabel2}>Developer</Text>
                            <Text style={styles.commonLabel2}>Developer</Text>
                            <Text style={styles.commonLabel2}>Developer</Text>
                        </View>
                    </View>
                    
                </View>
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
        width: 250,
        marginBottom: 8,
        padding: 8,
        textAlign: 'center',
        fontSize: 16
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
    },
    commonLabel2: {
        backgroundColor: 'rgba(46,45,44,0.7)',
        color: '#fff',
        borderRadius: 5,
        width: 150,
        marginBottom: 8,
        padding: 8,
        textAlign: 'center',
        fontSize: 16
    }
});
