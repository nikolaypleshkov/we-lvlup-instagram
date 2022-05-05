import {AuthAction, AuthState, USER, LOGOUT, LOADING, SUCCESS, ERROR, REGISTER, LOGIN, AUTH_INIT  } from "redux/types";

const initialState: AuthState = {
    user: null,
    authenticated: false,
    loading: false,
    initAuth: false,
    error: "",
    success: ""
}

export default (state = initialState, action: AuthAction) => {
    switch(action.type){
        case REGISTER: {
            return {
                ...state,
                user: action.payload,
                initAuth: true,
                authenticated: true
            }
        }
        case LOGIN: {
                return {
                    ...state,
                    user: action.payload,
                    initAuth: false,
                    authenticated: true
                }
        }
        case AUTH_INIT: {
            return {
                ...state,
                user: action.payload,
                initAuth: false,
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