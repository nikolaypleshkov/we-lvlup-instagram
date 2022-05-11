import { LocalUser, LOCAL_USER, REMOVE_USER, UserAction } from "redux/types";

const initState: LocalUser = {
  currentUser: null,
  posts: null,
  followingUsers: null,
  followedUsers: null
};

export default (state = initState, action: UserAction) => {
  switch (action.type) {
    case LOCAL_USER:
      return {
        ...state,
        currentUser: action.payload
      };
      case REMOVE_USER: 
        return{
            ...state,
            currentUser: null,
            posts: null,
            followingUsers: null,
            followedUsers: null
        }
    default: 
      return state;
  }
};
