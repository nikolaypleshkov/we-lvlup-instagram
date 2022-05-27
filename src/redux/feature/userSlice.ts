import { async } from '@firebase/util';
import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { log } from 'util';
import { app, db } from '../../service/firebaseSetup';
const auth = getAuth(app);

export interface User {
  email: string;
  fullname: string;
  username: string;
  posts: Array<string>;
  storyPosts: Array<string>;
  followers: number;
  followersID: Array<string>;
  following: number;
  followingID: Array<string>;
  bio: string;
  uuid: string;
  profileImage: string;
}

export interface AuthState {
  user: User | null;
  authenticated?: boolean;
  error?: SerializedError;
}

const initialState: AuthState = {
  user: null,
  authenticated: undefined,
  error: undefined,
};

interface PayLoad {
  user: User | null;
}

interface LoginInterface {
  email: string;
  password: string;
}
interface RegisterInterface {
    email: string;
    fullname: string;
    username: string;
    password: string;
  }

export const login = createAsyncThunk<AuthState, LoginInterface>(
  'login',
  async (data: LoginInterface, thunkAPI) => {
    try {
      const res = await (
        await signInWithEmailAndPassword(auth, data.email, data.password)
      ).user;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const qry = query(collection(db, 'users'), where('email', '==', res.email));
      const querySnapshot = await getDocs(qry);
      const snapshot = querySnapshot.docs[0];
      const userCredential = snapshot.data();
      const user: User = {
        email: userCredential.email,
        fullname: userCredential.fullname,
        username: userCredential.username,
        posts: userCredential.posts,
        storyPosts: userCredential.storyPosts,
        followers: userCredential.followers,
        followersID: userCredential.followersID,
        following: userCredential.following,
        followingID: userCredential.followingID,
        bio: userCredential.bio,
        uuid: userCredential.uuid,
        profileImage: userCredential.profileImage,
      };
      return { user } as PayLoad;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const loginWithGoogle = createAsyncThunk<AuthState, PayLoad | null>(
  'loginWithGoogle',
  async (req, thunkAPI) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await (await signInWithPopup(auth, provider)).user
      await addDoc(collection(db, 'users'), {
        email: result.email,
        fullname: result.displayName,
        username: result.displayName,
        posts: [],
        storyPosts: [],
        followers: 0,
        followersID: [],
        following: 0,
        followingID: [],
        bio: '',
        uuid: result.uid,
        profileImage: result.photoURL,
      });
      const user = {
        email: result.email,
        fullname: result.displayName,
        username: result.displayName,
        posts: [],
        storyPosts: [],
        followers: 0,
        followersID: [],
        following: 0,
        followingID: [],
        bio: '',
        uuid: result.uid,
        profileImage: result.photoURL,
      };
      return {user} as PayLoad
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateUser = createAsyncThunk<AuthState, string>(
  'updateUser',
  async (id: string, thunkAPI) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const qry = query(collection(db, 'users'), where('uuid', '==', id));
      const querySnapshot = await getDocs(qry);
      const snapshot = querySnapshot.docs[0];
      const userCredential = snapshot.data();
      const user: User = {
        email: userCredential.email,
        fullname: userCredential.fullname,
        username: userCredential.username,
        posts: userCredential.posts,
        storyPosts: userCredential.storyPosts,
        followers: userCredential.followers,
        followersID: userCredential.followersID,
        following: userCredential.following,
        followingID: userCredential.followingID,
        bio: userCredential.bio,
        uuid: userCredential.uuid,
        profileImage: userCredential.profileImage,
      };
      return { user } as PayLoad;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const signup = createAsyncThunk<AuthState, RegisterInterface>(
    'register',
    async (data: RegisterInterface, thunkAPI) => {
      try {
        const res = await (
          createUserWithEmailAndPassword(auth, data.email, data.password)
        );
        const newUser = await addDoc(collection(db, 'users'), {
            email: data.email,
            fullname: data.fullname,
            username: data.username,
            posts: [],
            storyPosts: [],
            followers: 0,
            followersID: [],
            following: 0,
            followingID: [],
            bio: '',
            uuid: "",
            profileImage: "",
          });
          await updateDoc(newUser, {
              uuid: newUser.id
          });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const qry = query(collection(db, 'users'), where('uuid', '==', newUser.id));
        const querySnapshot = await getDocs(qry);
        const snapshot = querySnapshot.docs[0];
        const userCredential = snapshot.data();
        const user: User = {
          email: userCredential.email,
          fullname: userCredential.fullname,
          username: userCredential.username,
          posts: userCredential.posts,
          storyPosts: userCredential.storyPosts,
          followers: userCredential.followers,
          followersID: userCredential.followersID,
          following: userCredential.following,
          followingID: userCredential.followingID,
          bio: userCredential.bio,
          uuid: userCredential.uuid,
          profileImage: userCredential.profileImage,
        };
        return { user } as PayLoad;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
    }
  );
export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    await auth.signOut();
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.authenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.authenticated = true;
    });
    builder.addCase(loginWithGoogle.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.authenticated = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authenticated = true;
      });
      builder.addCase(signup.rejected, (state, action) => {
        state.error = action.error;
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.authenticated = false;
      state.user = initialState.user;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});
