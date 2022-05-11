import { ThunkAction } from "redux-thunk";

import { RegisterData, AuthAction, USER, User, LOADING, LOGOUT, LoginData, ERROR, SUCCESS, LOGIN, REGISTER, AUTH_INIT } from "redux/types";
import { RootState } from "redux/store";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, db } from "service/firebaseSetup";
import { addDoc, collection, doc, DocumentData, getDocs, query, updateDoc, where } from "firebase/firestore";
import { async } from "@firebase/util";
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
                    uuid: res.user.uid,
                    profileImage: ""
                };
                await addDoc(collection(db, "users"), userCredential);
                dispatch({
                    type: REGISTER,
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
            console.log("res from login");
        
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
                followingID: user.followingID,
                bio: user.bio,
                uuid: user.uuid,
                profileImage: user.profileImage
            }
            dispatch({
                type: LOGIN,
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

export const profileConfig = (id: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async (dispatch) => {
        const qry = query(collection(db, "users"), where("uuid", "==", id));
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
            followingID: user.followingID,
            bio: user.bio,
            uuid: user.uuid,
            profileImage: user.profileImage
        }
        try{
            dispatch({
                type: LOGIN,
                payload: userCredential
            })
        }
        catch(err: any){
            dispatch(loading(false));
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

export const follow = (currentUserId: string, followedUserId: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async(dispatch) => {
        try{
            const currentUserQuery = query(collection(db, "users"), where("uuid", "==", currentUserId));
            const querySnapshot = await getDocs(currentUserQuery);
            let docId: string = "";
            let followingID: string[] = [];
            querySnapshot.forEach((doc) => {
                docId = doc.id;
                followingID = doc.data().followingID;
            });
            followingID.push(followedUserId);
            const docRef = doc(db, "users", docId);
            await updateDoc(docRef, {
                followingID: followingID,
                following: followingID.length
            });
            dispatch(profileConfig(currentUserId));
            const followedUserQuery = query(collection(db, "users"), where("uuid", "==", followedUserId));
            const querySnapshot2 = await getDocs(followedUserQuery);
            let followersID: string[] = [];
            querySnapshot2.forEach((doc) => {
                docId = doc.id;
                followersID = doc.data().followersID;
            });
            followersID.push(currentUserId);
            const follwedUserRef = doc(db, "users", docId);
            await updateDoc(follwedUserRef, {
                followersID: followersID,
                followers: followersID.length
            });
            dispatch(profileConfig(currentUserId));
        }
        catch(err){
            alert("Something went wrong: " + err)
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

