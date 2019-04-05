import { INIT_AGREEMENT, SERVICE_AGREEMENT_REQUEST } from '../types';
import update from 'react-addons-update';




// Initial State
const initialState = { agreementName: null, customerInfo: {} };
const agreement = (state = initialState, action) => {   
    switch (action.type) {
        case INIT_AGREEMENT:
            return { 
                ...state,
                agreementName: action.payload 
            };

        default:
            return state;
    }
};

// Export Reducer
export default agreement;
