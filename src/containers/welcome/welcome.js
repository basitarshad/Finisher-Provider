import React, { Component } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    ImageBackground, 
    Image, 
    StatusBar 
} from 'react-native';

//importing components
import LogoComponent from '../../components/logo';
import backgroundImage from '../../../assets/images/banner-login.jpg';
import dummyImage from '../../../assets/images/user-dummy.png';

export default class Welcome extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <StatusBar backgroundColor="#125c94" barStyle="light-content" />
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <LogoComponent />
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonInner}>
                        <Image source={dummyImage} />
                            <Text style={styles.textStyle}>
                                LOG IN
                            </Text>
                            <TouchableOpacity 
                                onPress={() => navigate('Login', { page: 'SERVICE PROVIDER' })}
                            >
                                <Text 
                                    style={styles.themebtn}
                                    title="Service Provider"
                                >
                                Service Provider
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => navigate('Login', { page: 'CUSTOMER' })}
                            >
                                <Text 
                                    style={styles.themebtn}
                                    title="Customer"
                                >
                                Customer
                                </Text>
                            </TouchableOpacity>
                        </View>                    
                    </View>            
                </View>
            </ImageBackground>
                     
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        position: 'relative',
        bottom: 0, 
        left: 0
    },
    logoContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '35%',
        paddingBottom: '8%'
    },
    buttonContainer: {
        flexGrow: 1, 
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '65%',
        paddingBottom: '10%'
    },
    buttonInner: {
        borderColor: '#125c94',
        borderWidth: 3.5,
        flex: 1,
        width: '80%',
        borderRadius: 8,
        padding: '4%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    themebtn: {
        backgroundColor: '#125c94',
        borderColor: 'white',
        borderRadius: 5,
        color: '#fff',
        fontSize: 16,
        width: 220,
        height: 50,
        margin: 10,
        textAlign: 'center',
        padding: 10
      },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: '2%'
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    }
});
