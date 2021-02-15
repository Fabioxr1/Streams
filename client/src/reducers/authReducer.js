import { SIGN_IN, SIGN_OUT } from "../actions/type";

const INITIAL_STATE = {
  isSignedIn: null,
  userId:null,
  nameUser: null
};

const authReducer =  (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId:action.payload.id, nameUser:action.payload.name };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId:null, nameUser:null };
    default:
      return state;
  }
};

export default authReducer;