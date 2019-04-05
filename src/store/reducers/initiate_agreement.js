import axios from 'axios';
import update from 'react-addons-update';
import { AsyncStorage } from "react-native";

// Locals 
import { API } from '../../utils/environments';
import { SERVICE_AGREEMENT_REQUEST, AGREEMENT_CONFIRMED, AGREEMENT_FALIED, CLOSE_REQUEST_MODAL } from '../types/agreement';


const initialState = { 
	customerInfo		: {}, 
	customerLocation	: {},
	agreementError		: {},
	gotAgreementRequest	: false,
	isRequestModalOpen:false, 
};

const ACTION_HANDLERS = {
	AGREEMENT_FALIED			: handleAgreementFailed,
	AGREEMENT_CONFIRMED			: handleAgreementConfirmed,
	SERVICE_AGREEMENT_REQUEST	: handleServiceAgreementRequest,
	CLOSE_REQUEST_MODAL			: handleCloseRequestModal,
}

const url = `${API}/agreements`;

export function closeRequestModal(){
	return (dispatch) => {
		dispatch({
			type: CLOSE_REQUEST_MODAL,
			payload: false
		});
	}
} 
export function onAcceptAgreement ( contract_details ) {
	return (dispatch) => {
		AsyncStorage.getItem('userInfo').then((response) => {
			let res= JSON.parse(response)
			const { provider } = res
			let obj= { 
				provider_Id		: provider._id, 
				agreement_id	: contract_details.agreement_id,
				provider_phone	: provider.username,
				provider_name	: provider.name,
				provider_region	: contract_details.region
			}
			axios.post(`${url}/confirmAgreement`, obj).then( response => {
				dispatch({
					type	: AGREEMENT_CONFIRMED,
					payload	: response.data.data
				})
			}).catch( error => {
				dispatch({
					type	: AGREEMENT_FALIED,
					payload	: error.error
				})
			});
		})
	}
}

function handleAgreementConfirmed(state, action) {
		console.log("data on confim agrrement===>", action.payload)
		return update(state, {
			customerLocation: { $set: action.payload },
			isRequestModalOpen:{$set:false},
			gotAgreementRequest:{$set:false}
		});
}

function handleAgreementFailed(state, action){
	return update(state, {
		agreementError: { $set: action.payload }
	})
}
function handleServiceAgreementRequest(state, action) {
	if(action.data){
		return update(state, {
			customerInfo		: {	$set: action.data },
			gotAgreementRequest	: { $set: true },
			isRequestModalOpen	: {$set:true}
		});
	}
	else{
		return update(state, {
			customerInfo		: { $set: {} },
			gotAgreementRequest	: { $set: false },
		})
	}
}

function handleCloseRequestModal(state, action){
	return update(state,{
		isRequestModalOpen:{
			$set:action.payload
		},
		gotAgreementRequest:{
			$set:false
		}
	})
}

export function startAgreementReducer(state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}