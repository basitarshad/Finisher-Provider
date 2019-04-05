import update from 'react-addons-update';
import constants from "../types/user-location";
import { Dimensions, AsyncStorage } from "react-native"
// import request from "../../../util/request";

// import calculateFare from "../../../util/fareCalculator.js";

//--------------------
//Constants
//--------------------
const {
	GET_CURRENT_LOCATION,
	GET_INPUT,
	TOGGLE_SEARCH_RESULT,
	GET_ADDRESS_PREDICTIONS,
	GET_SELECTED_ADDRESS,
	GET_DISTANCE_MATRIX,
	GET_FARE,
	BOOK_CAR,
	GET_NEARBY_DRIVERS,
	UPDATE_LOCATION,
	UPDATE_MY_LOCATION
} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA



//--------------------
//Actions
//--------------------
export function getCurrentLocation(position) {
	return (dispatch) => {
				dispatch({
					type: GET_CURRENT_LOCATION,
					payload: position});

				AsyncStorage.getItem('userInfo').then((response) => {
					let res= JSON.parse(response);
					console.log("res==========>userInfo", res);
					const { provider } = res;
					let obj={location:position,providerId:provider._id, userType:"provider"}
					dispatch({
						type: 'server/update-location',
						payload: obj
					});
				});
	}
}

// update user location

export function updateLocation(payload) {
	return {
		type: UPDATE_LOCATION,
		payload
	}
}

//update location on server

export function updateLocationOnServer(position) {
	return (dispatch) => {
		dispatch({
			type: 'server/update-location',
			payload: position
		});
	}
}
// GET USER INPUT

export function getInputData(payload) {
	return {
		type: GET_INPUT,
		payload
	}
}
// toggle search result modal
export function toggleSearchResultModal(payload) {
	return {
		type: TOGGLE_SEARCH_RESULT,
		payload
	}
}


// GET ADRESSES FROM GOOGLE PLACE

export function getAddressPredictions() {
	return (dispatch, store) => {
		let userInput = store().locationReducer.resultTypes.pickUp ? store().locationReducer.inputData.pickUp : store().locationReducer.inputData.dropOff;
		RNGooglePlaces.getAutocompletePredictions(userInput,
			{
				country: "MY"
			}
		)
			.then((results) =>
				dispatch({
					type: GET_ADDRESS_PREDICTIONS,
					payload: results
				})
			)
			.catch((error) => console.log(error.message));
	};
}


// //--------------------
// //Action Handlers
// //--------------------
function handleGetCurrentLocation(state, action) {
	return update(state, {
		region: {
			latitude: {
				$set: action.payload.coords.latitude
			},
			longitude: {
				$set: action.payload.coords.longitude
			},
			latitudeDelta: {
				$set: LATITUDE_DELTA
			},
			longitudeDelta: {
				$set: LONGITUDE_DELTA
			}
		}
	})
}

//update current Location
function handleUpdateCurrentLocation(state, action) {
	return update(state, {
		region: {
			latitude: {
				$set: action.payload.coords.latitude
			},
			longitude: {
				$set: action.payload.coords.longitude
			},
			latitudeDelta: {
				$set: LATITUDE_DELTA
			},
			longitudeDelta: {
				$set: LONGITUDE_DELTA
			}
		}
	})
}

function handleGetInputDate(state, action) {
	const { key, value } = action.payload;
	return update(state, {
		inputData: {
			[key]: {
				$set: value
			}
		}
	});
}

function handleToggleSearchResult(state, action) {
	return update(state, {
		resultTypes: {
			pickUp: {
				$set: true,
			},
			dropOff: {
				$set: false
			}
		},
		predictions: {
			$set: {}
		}

	});

}


function handleGetAddressPredictions(state, action) {
	return update(state, {
		predictions: {
			$set: action.payload
		}
	})
}

function handleGetSelectedAddress(state, action) {
	let selectedTitle = state.resultTypes.pickUp ? "selectedPickUp" : "selectedDropOff"
	return update(state, {
		selectedAddress: {
			[selectedTitle]: {
				$set: action.payload
			}
		},
		resultTypes: {
			pickUp: {
				$set: false
			},
			dropOff: {
				$set: false
			}
		}
	})
}

function handleGetDitanceMatrix(state, action) {
	return update(state, {
		distanceMatrix: {
			$set: action.payload
		}
	})
}

function handleGetFare(state, action) {
	return update(state, {
		fare: {
			$set: action.payload
		}
	})
}

//handle book car

function handleBookCar(state, action) {
	return update(state, {
		booking: {
			$set: action.payload
		}
	})
}


//handle get nearby drivers
function handleGetNearbyDrivers(state, action) {
	return update(state, {
		nearByDrivers: {
			$set: action.payload
		}
	});
}


function handleBookingConfirmed(state, action) {
	return update(state, {
		booking: {
			$set: action.payload
		}
	});

}

const ACTION_HANDLERS = {
	GET_CURRENT_LOCATION: handleGetCurrentLocation,
	GET_INPUT: handleGetInputDate,
	TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
	GET_ADDRESS_PREDICTIONS: handleGetAddressPredictions,
	UPDATE_LOCATION: handleUpdateCurrentLocation



}
const initialState = {
	region: {},
	inputData: {},
	resultTypes: {},
	selectedAddress: {}


};

export function locationReducer(state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}