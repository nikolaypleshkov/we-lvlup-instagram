import {createUserWithEmailAndPassword, getAuth} from "firebase/auth"
import {addDoc, collection, doc, DocumentData, getDoc, getDocs, query, updateDoc, where} from "firebase/firestore"
import {app, db} from "../firebaseSetup"

const auth = getAuth(app)
interface ReturnInterface{
    message: string;
    data: DocumentData
}
export async function signUpWithEmail(
  email: string,
  password: string,
  fullname: string,
  username: string
): Promise<ReturnInterface> {
  return createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            return await addDoc(collection(db, "users"), {
                uuid: user.uid,
                email: email,
                fullname: fullname,
                username: username,
                bio: "",
                followers: 0,
                followersID: [],
                following: 0,
                followingID: [],
                posts: [],
                storyPosts: []
            });
        }).then(async (res) => {
            try{
                const docRef =  await doc(db, "users", res.id);
                const ref: DocumentData = await getDoc(docRef);
                return { 
                    message: "Successful",
                    data: ref
                }
            }
            catch(err){
                console.log(err);
            }
        })
        .catch((err) => {
            return err.message;
        });
}

export async function updateUserProfile(id: string, profileImage: string, bio: string, username?: string){
    const q = query(collection(db, "users"), where("uuid", "==", id));
    const querySnapshot = await getDocs(q);
    let user: DocumentData = [];
    let docId: string = "";
    querySnapshot.forEach((doc) => {
        docId = doc.id
    });
    const docRef = doc(db, "users", docId);
    await updateDoc(docRef, {
        profileImage: profileImage,
        username: username,
        bio: bio
    });
}
