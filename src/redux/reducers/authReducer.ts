import {AuthAction, AuthState, USER, LOGOUT, LOADING, SUCCESS, ERROR, REGISTER, LOGIN, AUTH_INIT, FOLLOW  } from "redux/types";

const initialState: AuthState = {
    authUser: null,
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
                authUser: action.payload,
                initAuth: true,
                authenticated: true
            }
        }
        case LOGIN: {
                return {
                    ...state,
                    authUser: action.payload,
                    initAuth: false,
                    authenticated: true
                }
        }
        case AUTH_INIT: {
            return {
                ...state,
                authUser: action.payload,
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
                authUser: null,
                authenticated: false,
                loading: false
            }
        }
        case FOLLOW: {
            return{
                ...state,
                authUser: action.payload,
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