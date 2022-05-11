import { query, collection, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { ThunkAction } from "redux-thunk";
import { RootState } from "redux/store";
import { AuthAction, LIKE, POST, Post, User, UserPostAction, USER_POST } from "redux/types";
import { db } from "service/firebaseSetup";
import { profileConfig } from "./authActions";

export const userPosts = (user: User): ThunkAction<void, RootState, null, UserPostAction> => {
    return async (dispatch) => {
        const qry = query(collection(db, "posts"), where("createdByUserId", "==", user.uuid));
        const querySnapshot = await getDocs(qry);
        let posts: any[] = [];
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        try{
            dispatch(profileConfig(user.uuid))
        }catch(err){
            console.log("Something went wron",err);
        }
        
    }
}

export const userPostsWithId = (id: string): ThunkAction<void, RootState, null, UserPostAction> => {
    return async (dispatch) => {
        const qry = query(collection(db, "posts"), where("createdByUserId", "==", id));
        const querySnapshot = await getDocs(qry);
        let posts: any[] = [];
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });

        const qry2 = query(collection(db, "users"), where("uuid", "==", id));
        const querySnapshot2 = await getDocs(qry2);
        const snapshot = querySnapshot2.docs[0];
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
                type: POST,
                payload: posts,
                user: userCredential
            })
        }catch(err){
            console.log("Something went wron",err);
        }
        
    }
}

export const postId = (id: string | null): ThunkAction<void, RootState, null, UserPostAction> => {
    return async (dispatch) => {
        const qry = query(collection(db, "posts"), where("createdByUserId", "==", id));
        const querySnapshot = await getDocs(qry);
        let posts: any[] = [];
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        console.log(posts);
    }
}

export const likePost = (user: User, id: string | null): ThunkAction<void, RootState, null, UserPostAction> => {
    return async(dispatch) => {
        const docRef = doc(db, "posts", id!);
        const docSnap = await getDoc(docRef);
        let likesId: string[] = [];
        let likesCount: number = 0;
        if(docSnap.exists()){
            likesId = docSnap.data().likesID;
            if(likesId.includes(user.uuid)){
                likesId = likesId.filter((id) => id !== user.uuid);
            }
            else {
                likesId.push(user.uuid);
            }
            likesCount = likesId.length;
        }
        await updateDoc(docRef, {
            likesID: likesId,
            likes: likesCount
        })
        .then(async() => {
            const qry = query(collection(db, "posts"), where("createdByUserId", "==", id));
            const querySnapshot = await getDocs(qry);
            let posts: any[] = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });

            dispatch({
                type: POST,
                payload: posts,
                user: user
            })
        })
        console.log(likesId);
        
    }
}

export const dislikePost = (user: User, id: string | null): ThunkAction<void, RootState, null, UserPostAction> => {
    return async(dispatch) => {
        const docRef = doc(db, "posts", id!);
        const docSnap = await getDoc(docRef);
        let likesId: string[] = [];
        let likesCount: number = 0;
        if(docSnap.exists()){
            likesId = docSnap.data().likesID;
            likesId = likesId.filter((id) => id != user.uuid);
            likesCount = likesId.length;
        }
        await updateDoc(docRef, {
            likesID: likesId,
            likes: likesCount
        })
        .then(async() => {
            const qry = query(collection(db, "posts"), where("createdByUserId", "==", id));
            const querySnapshot = await getDocs(qry);
            let posts: any[] = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            dispatch({
                type: POST,
                payload: posts,
                user: user
            })
        })
    }
}

export const commentPost = (user: User, id: string | null): ThunkAction<void, RootState, null, UserPostAction> => {
    return async(dispatch) => {
        
    }
}