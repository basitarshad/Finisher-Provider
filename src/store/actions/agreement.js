import { AsyncStorage } from 'react-native';
import axios from 'axios';

import {
    INIT_AGREEMENTS, AGREEMENT_REQUEST, AGREEMENT_SUCCESS, AGREEMENT_FAIL, 
} from '../types';
import {API} from '../../utils/environments'

export const selectService = (type) => {
    return (dispatch) => {
    dispatch(initAgreement(type))
    }
};

export const initAgreement = (data) => {
    return {
        type: INIT_AGREEMENTS,
        payload: data
    }
};


