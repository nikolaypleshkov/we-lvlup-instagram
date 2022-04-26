import { ThunkAction } from "redux-thunk";

import { RegisterData, AuthAction, USER, User, LOADING, LOGOUT, LoginData, ERROR, SUCCESS } from "redux/types";
import { RootState } from "redux/store";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, db } from "service/firebaseSetup";
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
const auth = getAuth(app);
export const signup = (data: RegisterData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async (dispatch) => {
        try{
            const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
            if(res.user){
                const userCredential: User = {
                    email: data.email,
                    fullname: data.fullname,
                    username: data.username,
                    posts: [],
                    storyPosts: [],
                    followers: 0,
                    followersID: [],
                    following: 0,
                    followingID: [],
                    bio: "",
                    uuid: res.user.uid
                };
                await addDoc(collection(db, "users"), userCredential);
                dispatch({
                    type: USER,
                    payload: userCredential
                });
                onError();
            }
        }
        catch(err: any){
            onError();
            dispatch({
                type: ERROR,
                payload: err.message
            });
        }
    }
}

export const loading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            payload: value
        });
    }
}

export const login = (data: LoginData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async (dispatch) => {
        try{
            const res = await (await signInWithEmailAndPassword(auth, data.email, data.password)).user;
            const qry = query(collection(db, "users"), where("uuid", "==", res.uid));
            const querySnapshot = await getDocs(qry);
            const snapshot = querySnapshot.docs[0];
            const user = snapshot.data();
            const userCredential: User = {
                email: user.email,
                fullname: user.fullname,
                username: user.username,
                posts: user.posts,
                storyPosts: user.storyPosts,
                followers: user.followers,
                followersID: user.followersID,
                following: user.following,
                followingID: user.followersID,
                bio: user.bio,
                uuid: user.uuid
            }
            dispatch({
                type: USER,
                payload: userCredential
            })
            onError();
        }
        catch(err: any){
            onError();
            dispatch(setError(err.code));
        }
    }
}

export const logout = (): ThunkAction<void, RootState, null, AuthAction> => {
    return async (dispatch) => {
        try{ 
            dispatch(loading(true));
            await auth.signOut();
            dispatch({
                type: LOGOUT
            });
        }
        catch(err){
            dispatch(loading(false));
        }
    }
}

export const setError = (message: string): ThunkAction<void, RootState, null, AuthAction> => {
    return (dispatch) => {
        dispatch({
            type: ERROR,
            payload: message
        });
    }
}

export const success = (message: string): ThunkAction<void, RootState, null, AuthAction> => {
    return (dispatch) => {
        dispatch({
            type: SUCCESS,
            payload: message
        });
    }
}

