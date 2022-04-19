export const USER = "USER";
export const LOGOUT = "LOGOUT";
export const LOADING = "LOADING";
export const ERROR = "ERROR";
export const SUCCESS = "SUCCESS";

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
}

export interface AuthState {
    user: User | null;
    authenticated: boolean;
    loading: boolean;
    error: string;
    success: string;
}


export interface RegisterData{
    email: string;
    fullname: string;
    username: string;
    password: string;
}

export interface LoginData{
    email: string;
    passsword: string;
}

interface UserAction{
    type: typeof USER;
    payload: User;
}

interface LoadingAction{
    type: typeof LOADING;
    payload: boolean
}

interface LogoutAction{
    type: typeof LOGOUT;
}

interface ErrorAction{
    type: typeof ERROR;
    payload: string;
}

interface SuccessAction{
    type: typeof SUCCESS;
    payload: string;
}

export type AuthAction = UserAction | LoadingAction | LogoutAction | ErrorAction | SuccessAction;