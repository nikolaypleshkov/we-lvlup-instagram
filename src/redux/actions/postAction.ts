import { query, collection, where, getDocs } from "firebase/firestore";
import { ThunkAction } from "redux-thunk";
import { RootState } from "redux/store";
import { AuthAction, POST, Post, User, UserPostAction } from "redux/types";
import { db } from "service/firebaseSetup";

export const userPosts = (user: User | null): ThunkAction<void, RootState, null, UserPostAction> => {
    return async (dispatch) => {
        const qry = query(collection(db, "posts"), where("createdByUserId", "==", user?.uuid));
        const querySnapshot = await getDocs(qry);
        let posts: any[] = [];
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        console.log(posts);
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