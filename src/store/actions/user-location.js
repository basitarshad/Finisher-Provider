import {GET_USER_LOCATION, UPDATE_LOCATION} from '../types'
import ReactNativeLocationServicesSettings from 'react-native-location-services-settings'

export function getCurrentLocation(){
	
	return(dispatch)=>{
        ReactNativeLocationServicesSettings.checkStatus('high_accuracy').then(res => {
        if (!res.enabled) {
            ReactNativeLocationServicesSettings.askForEnabling(res => {
            if (res) {
                console.log('location services were allowed by the user')
            } else {
                console.log('location services were denied by the user')
            }
            })
        }
        })

		navigator.geolocation.getCurrentPosition(
			(position)=>{
				dispatch({
					type:GET_CURRENT_LOCATION,
					payload:position
				});
			},
			(error)=> console.log(error.message),
			{ enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
		);
	}
}

function handleGetCurrentLocation(state, action){
    return UPDATE_LOCATION(state, {
        region:{
            $set:action.payload
        }
    })
}

const  ACTION_HANDLER={
    GET_USER_LOCATION:handleGetCurrentLocation
}