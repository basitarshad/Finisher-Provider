// auth types
import { 
    CONTRACT_TRACKER_TIME_STARTED,
    CONTRACT_TRACKER_TIME_STOPPED,
    CONTRACT_TRACKER_TIME_SUCCESS,
    CONTRACT_TRACKER_TIME_FAIL
} from '../types';


    // Initial State for auth reducer
const initialState = { 
    // user data
    timer           : '',
    error           : '',
    isTimerStart    :false,
    isTimerStopped  :false,
    isTimerSet      :false
};

// cases for auth reducer
const contract = (state = initialState, action) => {   
    switch (action.type) {
        
        case CONTRACT_TRACKER_TIME_STARTED: 
        return { 
            ...state,
            timer  : '',
            error       : action.payload,
            isTimerStart : false
        };
        case CONTRACT_TRACKER_TIME_STOPPED: 
        return { 
            ...state,
            timer  : '',
            error       : action.payload,
            isTimerStopped : false,
        };
        case CONTRACT_TRACKER_TIME_SUCCESS: 
        return { 
            ...state,
            timer  : action.payload,
            isTimerSet : true
        };
        case CONTRACT_TRACKER_TIME_FAIL: 
        return { 
            ...state,
            timer  : action.payload,
            isTimerSet : false,
        };
 
        default:
            return state;
    }
};

// Export Reducer
export default contract;
