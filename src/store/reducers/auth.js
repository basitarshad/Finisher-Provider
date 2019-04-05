// auth types
import { 
    SIGNUP_REQUEST, 
    SIGNUP_SUCCESS, 
    SIGNUP_FAIL, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USERINFO_REQUEST, 
    USERINFO_SUCCESS, 
    USERINFO_FAIL, 
    USERINFO_UPDATE,
    CODE_SENT_SUCCESS,
    CODE_SENT_FAILURE,
    PHONE_CHECK_SUCCESS,
    PHONE_CHECK_FAILURE,
    MATCH_CODE_SUCCESS,
    MATCH_CODE_FAILURE, 
    PROFILE_IMAGE_UPLOAD_SUCCESS,
    PROFILE_IMAGE_UPLOAD_FAILURE,
    CNIC_IMAGES_UPLOAD_SUCCESS,
    CNIC_IMAGES_UPLOAD_FAILURE,
    PROFILE_IMAGE_SAVE,
    CNIC_IMAGES_SAVE,
    CNIC_NUMBER_SAVE,
    CLEAR_PHONE_AND_CODE
} from '../types';
 

    // Initial State for auth reducer
const initialState = { 
    // user data
    userInfo    : {},
    name        : '',
    email       : '',
    profession  : '',
    password    : '',
    token       : null, 
    phone       : null,
    pending     : false, 
    cnicNumber  : '',
    cnicUpload  : null,
    profileImage: null,
    profileImageURL : '',
    
    // data to make logic
    error       : null, 
    isLoggedIn  : false, 
    isRegister  : false,
    phoneFound  : false,
    isCodeSent  : false,      
    isCodeMatched   : false,
    isImageUploaded : false,
    erroOnCnicUpload            : null,
    errorOnPhoneVerification    : null,
    responseOnCodeVerification  : null,
    errorOnProfileImageUpload   : null
};

// cases for auth reducer
const auth = (state = initialState, action) => {   
    switch (action.type) {
        
        case LOGIN_REQUEST: 
           return { 
               ...state,
               pending:false  
            };

        case LOGIN_SUCCESS: 
            return { 
                ...state,
                token       : action.payload,
                pending     : false,  
                isLoggedIn  : true
            };     
        
        case LOGIN_FAIL: 
            return { 
                ...state,
                isLoggedIn  : false,
                token       : null,
                pending     : false,
                error       : action.payload 
            };

        case CODE_SENT_SUCCESS: 
            return{ 
                ...state, 
                isCodeSent  : true,  
                phone       : action.payload
            };
        
        case CODE_SENT_FAILURE:
            return{
                ...state,
                isCodeSent  : false,
                errorOnPhoneVerification : action.payload
            };

        case PHONE_CHECK_SUCCESS: 
            return{
                ...state,
                phone                   : action.payload,
                msgOnPhoneVerification  : null,
            };
             
        case PHONE_CHECK_FAILURE: 
        return{
            ...state,
            errorOnPhoneVerification    : action.payload
        }

        case MATCH_CODE_SUCCESS: 
        return{
            ...state,
            isCodeMatched               : true,
            codeMismatchMsg             : null,
            responseOnCodeVerification  :action.payload
        }

        case MATCH_CODE_FAILURE: 
        return{
            ...state,
            codeMismatchMsg     : action.payload
        }

        case PROFILE_IMAGE_UPLOAD_SUCCESS: 
        return{
            ...state,
            errorOnProfileImageUpload   : null,
            isImageUploaded             : true,
            profileImageURL             : action.payload
        }

        case PROFILE_IMAGE_UPLOAD_FAILURE: 
        return{
            ...state,
            errorOnProfileImageUpload   : action.payload,
            isImageUploaded             : false
        }

        case CNIC_IMAGES_UPLOAD_SUCCESS: 
        return{
            ...state,
            erroOnCnicUpload : null,
            cnicUpload       : action.payload
        }

        case CNIC_IMAGES_UPLOAD_FAILURE: 
        return{
            ...state,
            erroOnCnicUpload:action.payload.message
        }
        case SIGNUP_REQUEST: 
        return { 
            ...state,
            pending : true  
            };
 
         case SIGNUP_SUCCESS: 
             return { 
                 ...state,
                isRegister  : true,
                pending     : false  
             };     
         
         case SIGNUP_FAIL: 
             return { 
                 ...state,
                 pending:false,
                 error :action.payload 
        };
        case USERINFO_REQUEST: 
        return { 
            ...state,
            pending:true  
            };
 
         case USERINFO_SUCCESS: 
             return { 
                 ...state,
                userInfo:action.payload,
                pending:false  
             };     
         
         case USERINFO_FAIL: 
            return {
                 ...state,
                 pending:false,
                 error :action.payload 
            };  
            
        case PHONE_CHECK_SUCCESS:
            return {
                ...state,
                phoneFound: true
            };
        
        case PHONE_CHECK_FAILURE:
            return {
                ...state,
                phoneFound:false
            };
        
        case USERINFO_UPDATE:
            return {
                ...state,
                name        : action.payload.name,
                email       : action.payload.email,
                password    : action.payload.password,
                profession  : action.payload.profession
            };
        
        case PROFILE_IMAGE_SAVE:
            return {
                ...state,
                profileImage: action.payload
            };

        case CNIC_IMAGES_SAVE:
            return {
                ...state,
                cnicImages  : true,
                cnic_front  : action.payload.cnic_front,
                cnic_back   : action.payload.cnic_back
            };
        
        case CNIC_NUMBER_SAVE:
            return {
                ...state,
                cnicNumber: action.payload
            }
        
        case CLEAR_PHONE_AND_CODE:
        return {
            ...state,
            phone                       : null,
            isCodeSent                  : false,  
            isCodeMatched               : false,
            codeMismatchMsg             : null,
            errorOnPhoneVerification    : null,
            responseOnCodeVerification  : null
        }

        default:
            return state;
    }
};

// Export Reducer
export default auth;
