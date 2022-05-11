import { async } from "@firebase/util";
import { ThunkAction } from "redux-thunk";
import { RootState } from "redux/store";
import { LOCAL_USER, REMOVE_USER, User, UserAction } from "redux/types";

export const loadAuthenticatedUser = (user: User): ThunkAction<void, RootState, null, UserAction> => {
    return async (dispatch) => {
        try{
            dispatch({
                type: LOCAL_USER,
                payload: user
            })
        }
        catch(err){
            alert("Something went wrong: " + err);
        }
    }
}

export const removeUser = (): ThunkAction<void, RootState, null, UserAction> =>{ 
    return async(dispatch) => {
        dispatch({
            type: REMOVE_USER
        })
    }
}