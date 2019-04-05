/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

// importing images
import PainterImage from '../../assets/images/icons/painter.png';
import Electrician from '../../assets/images/icons/electric.png';
import PlumberImage from '../../assets/images/icons/plumber.png';
import Refrigerator from '../../assets/images/icons/refrigator.png';
import HomeCleaner from '../../assets/images/icons/house-cleaner.png';
import HomeServices from '../../assets/images/icons/home-services.png';


export default class Mainview extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.serviceContainer}>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Image source={PainterImage} />
                        <Text>
                            Painter main screen
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Image source={Electrician} />
                        <Text>
                            Electrician
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Image source={HomeServices} />
                        <Text>
                            Air Conditioner
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Image source={HomeCleaner} />
                        <Text>
                            Home Cleaner
                            </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.serviceContainer}>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Image source={PlumberImage} style={styles.imageStyle} />
                        <Text>
                            Plumber
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Image source={Refrigerator} />
                        <Text>
                            UPS Repairing
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Text>
                            Carpenter
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Text>
                            Decoration
                            </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: '5%'
    },
    serviceContainer: {
        flexGrow: 1,
        padding: '5%'
    },
    imageContainer: {
        borderColor: 'black',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '4%',
        height: '30%'
    },
    imageStyle: {
        height: '4%'
    }
});
