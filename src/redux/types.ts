import { Timestamp } from "firebase/firestore";

export const USER = "USER";
export const POST = "POST";
export const USER_POST = "USER_POST";
export const LIKE = "LIKE";
export const FOLLOW = "FOLLOW"
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const AUTH_INIT = "AUTH_INIT";
export const REGISTER = "REGISTER";
export const LOADING = "LOADING";
export const ERROR = "ERROR";
export const SUCCESS = "SUCCESS";
export const LOCAL_USER = "LOCAL_USER";
export const REMOVE_USER = "REMOVE_USER"

export interface User{
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
    authUser: User | null;
    authenticated: boolean;
    loading: boolean;
    initAuth: boolean;
    error: string;
    success: string;
}

export interface Post{
    comments: number;
    commentsId: Array<string>;
    createdBy: User;
    createdByUserId: string;
    description: string;
    likes: number;
    likesId: Array<string>;
    postImage: string;
    timestamp: Timestamp;
    uuid: string
}

export interface PostState{
    user: User | null;
    posts: Array<Post> | null;
}
export interface LocalUser{
    currentUser: User | null;
    posts: Array<Post> | null;
    followingUsers: User | null;
    followedUsers: User | null;
}
export interface RegisterData{
    email: string;
    fullname: string;
    username: string;
    password: string;
}           

export interface LoginData{
    email: string;
    password: string;
}

interface PostAction{
    user: User;
    type: typeof POST;
    payload: Array<Post>;
}

interface FollowAction{
    type: typeof FOLLOW;
    payload: User
}

interface LikeAction{
    user: User;
    type: typeof LIKE;
    payload: Array<Post>;
}

interface UserWithIdAction{
    type: typeof USER_POST;
    payload: Array<Post>;
    user: User;
}

interface FirstAuth{
    type: typeof AUTH_INIT;
    payload: User;
}

interface RegisterAction{
    type: typeof REGISTER;
    payload: User;
}


interface LoginAction{
    type: typeof LOGIN;
    payload: User;
}

interface LocalUserAction{
    type: typeof LOCAL_USER;
    payload: User;
}

interface LoadingAction{
    type: typeof LOADING;
    payload: boolean
}

interface LogoutAction{
    type: typeof LOGOUT;
}
interface RemoveUserAction{
    type: typeof REMOVE_USER;
}
interface ErrorAction{
    type: typeof ERROR;
    payload: string;
}

interface SuccessAction{
    type: typeof SUCCESS;
    payload: string;
}


export type AuthAction =  RegisterAction | FirstAuth | LoginAction | FollowAction | LoadingAction | LogoutAction | ErrorAction | SuccessAction;
export type UserPostAction = PostAction | LikeAction | UserWithIdAction;
export type UserAction = LocalUserAction | RemoveUserAction;