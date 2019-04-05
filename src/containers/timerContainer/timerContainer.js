import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, StatusBar, Text, FormValidationMessage, AsyncStorage } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import * as actions from '../../store/actions/contracts';

import Timer from '../../components/timer';
import { LogoComponent, BackgroundComponent } from '../../../components';
// image background-
 
class TimerContainer extends Component {

    componentWillReceiveProps(props) {
        console.log('check1')
        if (props.isTimerSet) {
            AsyncStorage.getItem('timer').then((response) => {
                let res= JSON.parse(response);
                console.log('response from timerContainer=>', res)
              });
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <BackgroundComponent>
                <StatusBar backgroundColor="#02abb0" barStyle="light-content" />
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={styles.formContainer}>
                                <Timer
                                    navigate    = { navigate }
                                    isTimerSet  = { this.props.isTimerSet }
                                    setTimerValue = {(value)=>this.props.setTimerValue(value)}
                                />
                            </View>
                        </View>
                    </ScrollView>
            </BackgroundComponent>
        );
    }
}
const mapStateToProps = ({ contractsReducer }) => {
    return {
        timer      :   contractsReducer.timer,
        isTimerSet :    contractsReducer.isTimerSet,
    };
};

export default connect(mapStateToProps, actions)(TimerContainer);

const styles = StyleSheet.create({
    formContainer: {
        height          : hp('100%'),
        width           : wp('100%')
    },
});
