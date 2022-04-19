import {AuthAction, AuthState, USER, LOGOUT, LOADING, SUCCESS, ERROR  } from "redux/types";

const initialState: AuthState = {
    user: null,
    authenticated: false,
    loading: false,
    error: "",
    success: ""
}

export default (state = initialState, action: AuthAction) => {
    switch(action.type){
        case USER: {
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        }
        case LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: null,
                authenticated: false,
                loading: false
            }
        }
        case ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case SUCCESS: {
            return {
                ...state,
                success: action.payload
            }
        }
        default: 
            return state;
    }
}