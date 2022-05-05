import { query, collection, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { ThunkAction } from "redux-thunk";
import { RootState } from "redux/store";
import { AuthAction, LIKE, POST, Post, User, UserPostAction } from "redux/types";
import { db } from "service/firebaseSetup";

export const userPosts = (user: User | null): ThunkAction<void, RootState, null, UserPostAction> => {
    return async (dispatch) => {
        const qry = query(collection(db, "posts"), where("createdByUserId", "==", user?.uuid));
        const querySnapshot = await getDocs(qry);
        let posts: any[] = [];
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        try{
            dispatch({
                type: POST,
                payload: posts,
                user: user
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
            likesId.push(user.uuid);
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
                type: LIKE,
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
                type: LIKE,
                payload: posts,
                user: user
            })
        })
    }
}