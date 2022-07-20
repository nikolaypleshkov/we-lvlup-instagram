
import { query, collection, where, getDocs, updateDoc, doc, setDoc, Timestamp, limit, orderBy, DocumentData, startAt, startAfter} from "firebase/firestore";
import { updateUser, User } from "../redux/feature/userSlice";
import { db, } from "./firebaseSetup";

export const followUser = async(authUser: User, id: string) => {
     //Current Authenticated User
     const currentUserQuery = query(collection(db, "users"), where("uuid", "==", authUser?.uuid));
     const querySnapshot = await (await getDocs(currentUserQuery)).docs[0];
     const newFollowing = [...querySnapshot.data().followingID, id];
     const docRef = doc(db, "users", querySnapshot.id);
     await updateDoc(docRef, {
         followingID: newFollowing,
         following: newFollowing?.length
     });
   // The Followed User
   const currentUserQuery1 = query(collection(db, "users"), where("uuid", "==", id));
   const querySnapshot1 = await (await getDocs(currentUserQuery1)).docs[0];
   const docRef1 = doc(db, "users", querySnapshot1.id);
   const newFollowing1 = [...querySnapshot1.data().followersID, authUser?.uuid];
   await updateDoc(docRef1, {
         followersID: newFollowing1,
         followers: newFollowing1?.length
     }).then(async() => {

        await setDoc( doc(db, 'users', id!, 'notifications', authUser?.uuid!),{
            type: 'follow',
            user: authUser?.uuid,
            post: "",
            createdAt: Timestamp.now(),
          }) 
     })
}

export const unfollowUser = async(authUser: User, id: string) => {
    const newFollowing = authUser?.followingID.filter((followingId) => followingId !==id );
      //Current Authenticated User
      const currentUserQuery = query(collection(db, "users"), where("uuid", "==", authUser?.uuid));
      const querySnapshot = await (await getDocs(currentUserQuery)).docs[0];
      const docRef = doc(db, "users", querySnapshot.id);
      await updateDoc(docRef, {
          followingID: newFollowing,
          following: newFollowing?.length
      });
    // The Unfollowed User
    const currentUserQuery1 = query(collection(db, "users"), where("uuid", "==", id));
    const querySnapshot1 = await (await getDocs(currentUserQuery1)).docs[0];
    const docRef1 = doc(db, "users", querySnapshot1.id);
    const newFollowing1 = querySnapshot1?.data().followingID.filter((followedID: string) => followedID !== authUser?.uuid );
    await updateDoc(docRef1, {
          followersID: newFollowing1,
          followers: newFollowing1?.length
      });
}

export async function getPostsFirstBarch(){
  try{

    const qry = query(collection(db, "posts"))
    const querySnapshot = await getDocs(qry);
    let posts: DocumentData[] = [];
    let lastPostKey = "";
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
      lastPostKey = doc.data().uuid;
    });

    return {posts, lastPostKey};
  }
  catch(err){
    console.error(err);
    
  }
}

export async function getPostsNextBatch(key?: string){
  try{
    const qry =  query(collection(db, "posts"), orderBy("timestamp", "desc"), orderBy("uuid"),startAfter(key), limit(2));
    const querySnapshot = await getDocs(qry);
    let posts: DocumentData[] = [];
    let lastPostKey = "";
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
      lastPostKey = doc.data().uuid;
    });

    return {posts, lastPostKey};
  }
  catch(err){
    console.error(err);
    
  }
}