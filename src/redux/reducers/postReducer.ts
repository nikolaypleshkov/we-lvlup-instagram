import { LIKE, POST, PostState, UserPostAction } from "redux/types";

const initState: PostState = {
    user: null,
    posts: null
}

export default (state = initState, action: UserPostAction) => {
    switch(action.type){
        case POST: {
            return{
                ...state,
                posts: action.payload,
                user: action.user
            }
        }
        case LIKE: {
            return{
                ...state,
                post: action.payload,
                user: action.user   
            }
        }
        default: 
            return state;
    }
}