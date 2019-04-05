import { AsyncStorage } from 'react-native';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';
import axios from 'axios';
import {API} from '../../utils/environments'
  
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    USERINFO_SUCCESS,
    USERINFO_FAIL,
    USERINFO_REQUEST,
    PHONE_CHECK_SUCCESS,
    PHONE_CHECK_FAILURE,
    CODE_SENT_SUCCESS,
    CODE_SENT_FAILURE,
    MATCH_CODE_SUCCESS,
    MATCH_CODE_FAILURE,
    USERINFO_UPDATE,
    PROFILE_IMAGE_SAVE,
    CNIC_IMAGES_SAVE,
    PROFILE_IMAGE_UPLOAD_SUCCESS,
    PROFILE_IMAGE_UPLOAD_FAILURE,
    CNIC_IMAGES_UPLOAD_FAILURE,
    CNIC_NUMBER_SAVE,
    CLEAR_PHONE_AND_CODE
} from '../types/auth';
 
const url = `${API}/providers`
export const login = (body) => {
    console.log('hereasd')
    return (dispatch) => {
        return axios.post(`${url}/login`, { username: body.username, password: body.password })
            .then(response => {
                AsyncStorage.setItem('auth', JSON.stringify(response));
                dispatch(loginSuccess(response.data))
            })
            .catch(error => {
                let errorMessage = 'Invalid Username Or password'
                dispatch(loginFailed(errorMessage))
            });
    };
};

export const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
};

export const loginFailed = (error) => {
    console.log('error message', error)
    return {
        type: LOGIN_FAIL,
        payload: error
    }
};
 
export const checkPhoneNumber = ( phoneNumber ) => {
    return (dispatch) => {
        return axios.post(`${url}/verifyPhone`, { phone: phoneNumber })
            .then(response => {
                if(response.data.success){
                    dispatch({ type: CODE_SENT_SUCCESS, payload: response.data.data});
                } else {
                    dispatch({ type: CODE_SENT_FAILURE, payload: response.data.message});
                }
            })
            .catch(error => {
                dispatch({ type: CODE_SENT_FAILURE, payload: error });
            });
    };
};

export const verfiyCode = ( phoneNumber, verificationCode ) => {
    return(dispatch) =>{
        
        return axios.post(`${url}/matchCode`, { phone: phoneNumber, code: verificationCode }).then( response => {
            if(response.data.success){
                console.log("matched");
                dispatch({ type: MATCH_CODE_SUCCESS, payload: response.data.message});
            }
            else{
                dispatch({ type: MATCH_CODE_FAILURE, payload: response.data.error });
            }
            
        }).catch( error => {
            console.log('Error in VerifyCode',error)
        });
    }
};

export const getProviderInfo = (body) => {
    return (dispatch) => {
        return axios.get(`${url}/info`, {headers: { Authorization: `Bearer ${body}` }})
            .then(response => {
                AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
                dispatch(getProviderInfoSuccess(response.data))
            })
            .catch(error => {
                let errorMessage = 'you are not authorized to get this information'
                dispatch(getProviderInfoFailed(errorMessage))
            });
    };
};

export const getProviderInfoSuccess = (data) => {
    return {
        type: USERINFO_SUCCESS,
        payload: data
    }
};

export const getProviderInfoFailed = (error) => {
    return {
        type: USERINFO_FAIL,
        payload: error
    }
};

export const signup = () => {
    return (dispatch, store) => {
        return axios.post(`${url}/signup`, { 
            name        : store().authReducer.name, 
            password    : store().authReducer.password, 
            cnic        : store().authReducer.cnicNumber, 
            username    : store().authReducer.phone, 
            email       : store().authReducer.email, 
            profession  : store().authReducer.profession 
        }).then(response => {
                console.log("signup response success===>",response);
                dispatch(signupSuccess(response.data));
            })
            .catch(error => {
                let errorMessage = 'Error in signup please try again signup =>' + error
                dispatch(signupFailed(errorMessage))
            });
    };
};

export const signupSuccess = (data) => {
    return {
        type: SIGNUP_SUCCESS,
        payload: data
    }
};

export const signupFailed = (error) => {
    return {
        type: SIGNUP_FAIL,
        payload: error
    }
};

export const infoUpdate = (data) => {
    return (dispatch) => {
        dispatch({type: USERINFO_UPDATE, payload: data})
    };
}

export const saveProfileImage = ( data ) => {
    return (dispatch, store) => {

        let apiUrl = url+ '/uploadProfileImage';
        let formData = new FormData();

        formData.append('profile_image', {
            uri:    data.uri,
            type:   'image/jpeg',
            name:   store().authReducer.phone + '_profile.jpeg'
        });

        let options = {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        };

        // sending profile image
        axios.post( apiUrl, formData, options ).then(( result ) => {
            if(result.data.success){
                dispatch({ type: PROFILE_IMAGE_UPLOAD_SUCCESS, payload: result.data.profile_image_url })
            }             
        })
        .catch((error) => {
            console.log('in error', error);
            let errorMessage = 'Error in signup please try again image=>' + error
            dispatch({ type: PROFILE_IMAGE_UPLOAD_FAILURE, payload: errorMessage});
        });       
    }
}

export const saveCnicImages = ( data ) => {
    return (dispatch, store) => {

        let apiUrl = url+ '/cnicUpload';
        let formData = new FormData();

        formData.append('cnic_front', {
            uri:    data.frontImageResult.uri,
            type:   'image/jpeg',
            name:   store().authReducer.phone + '_front.jpeg'
        });

        formData.append('cnic_back', {
            uri:    data.backimageResult.uri,
            type:   'image/jpeg',
            name:   store().authReducer.phone + '_back.jpeg'
        });

        let options = {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        };

        // sending profile image
        axios.post( apiUrl, formData, options ).then(( result ) => {
            if(result.data.success){
                dispatch({ type: CNIC_NUMBER_SAVE, payload: data.cnic });
                dispatch(signup())
            } else {
                dispatch({ type: CNIC_IMAGES_UPLOAD_FAILURE, payload: result.data.error}); 
            }         
        })
        .catch((error) => {
            console.log('in error', error);
            let errorMessage = 'Error in signup please try again image=>' + error
            dispatch({ type: CNIC_IMAGES_UPLOAD_FAILURE, payload: errorMessage});
        });       
    }
}

export const clearPhoneScreenData = () => {
    return (dispatch) => {
        dispatch({ type: CLEAR_PHONE_AND_CODE , payload: {}});
    }
}

