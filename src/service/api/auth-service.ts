import {createUserWithEmailAndPassword, getAuth} from "firebase/auth"
import {addDoc, collection} from "firebase/firestore"
import {app, db} from "../firebaseSetup"

const auth = getAuth(app)
export async function signUpWithEmail(
  email: string,
  password: string,
  fullname: string,
  username: string
): Promise<string> {
  return createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            return await addDoc(collection(db, "users"), {
                uuid: user.uid,
                email: email,
                fullname: fullname,
                username: username
            });
        }).then((res) => {
            return "Successful"
        })
        .catch((err) => {
            return err.message;
        });
}
