/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
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
import HomeCleaner from '../../assets/images/icons/house-cleaner.png';
import HomeServices from '../../assets/images/icons/home-services.png';
import airConditioner from '../../assets/images/icons/air-conditioner.png';
import carpenter from '../../assets/images/icons/carpainter.png';
import decorator from '../../assets/images/icons/decor-interior.png';

export default class Homeview extends Component {
			render() {
					return (
						<View style={styles.container}>
								<View style={styles.serviceContainer}>
									<TouchableOpacity
										style={styles.imageContainer}
										onPress={() => this.props.navigate('selectAgreement', { selectedService: 'Painter' })}
									>
										<Image source={PainterImage} style={styles.imageStyle} />
										<Text>
												Painter
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.imageContainer}
										onPress={() => this.props.navigate('selectAgreement', { selectedService: 'Electrician' })}
									>
										<Image source={Electrician} style={styles.imageStyle} />
										<Text>
												Electrician
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.imageContainer}
										onPress={() => this.props.navigate('selectAgreement', { selectedService: 'Air Conditioner' })}
									>
											<Image source={HomeServices} style={styles.imageStyle} />
											<Text>
												Air Conditioner
											</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.imageContainer}
										onPress={() => this.props.navigate('selectAgreement', { selectedService: 'Home Cleaner' })}
									>
										<Image source={HomeCleaner} style={styles.imageStyle} />
										<Text>
												Home Cleaner
										</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.serviceContainer}>
										<TouchableOpacity
											style={styles.imageContainer}
											onPress={() => this.props.navigate('selectAgreement', { selectedService: 'Plumber' })}
										>
												<Image source={PlumberImage} style={styles.imageStyle} />
												<Text>
														Plumber
														</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={styles.imageContainer}
									onPress={() => this.props.navigate('selectAgreement', { selectedService: 'UPS Repairing' })}
										>
												<Image source={airConditioner} style={styles.imageStyle} />
												<Text>
														UPS Repairing
														</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={styles.imageContainer}
											onPress={() => this.props.navigate('selectAgreement', { selectedService: 'Carpenter' })}
										>
												<Image source={carpenter} style={styles.imageStyle} />
												<Text>
														Carpenter
														</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={styles.imageContainer}
											onPress={() => this.props.navigate('selectAgreement', { selectedService: 'Decoration' })}
										>
												<Image source={decorator} style={styles.imageStyle} />
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp('3%'),
        paddingHorizontal: wp('5%')
    },
    serviceContainer: {
        flexGrow: 1,
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('2.5%')
    },
    imageContainer: {
        borderColor: 'black',
        borderWidth: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp('1%'),
        height: hp('13%')
    },
    imageStyle: {
        height: hp('6.2%'),
        width: wp('8%'),
        marginBottom: hp('0.4')
    }
});
