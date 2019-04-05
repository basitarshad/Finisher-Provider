/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import authReducer from './auth'; 
import agreementReducer from './agreement';
import {locationReducer} from './user-location'; 
import { startAgreementReducer } from './initiate_agreement';
import contractsReducer from './contracts';

// Combine all reducers into one root reducer
export default combineReducers({
  authReducer, agreementReducer, locationReducer, startAgreementReducer, contractsReducer
});
