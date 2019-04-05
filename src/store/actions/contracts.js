import { AsyncStorage } from 'react-native';
 
import {
    CONTRACT_TRACKER_TIME_STARTED,
    CONTRACT_TRACKER_TIME_STOPPED,
    CONTRACT_TRACKER_TIME_SUCCESS,
    CONTRACT_TRACKER_TIME_FAIL
} from '../types/contracts';

export const setTimerValue = ( data ) => {
    console.log("timer data=====>",data)
    return(dispatch) => {
        if(data){
            console.log('in contract action method =>',data)
            AsyncStorage.setItem('timer' , JSON.stringify(data));
            dispatch( {type: CONTRACT_TRACKER_TIME_SUCCESS, payload : data});
        }
        else{
            dispatch({type: CONTRACT_TRACKER_TIME_FAIL, payload :'error'});
        }
    }
}
