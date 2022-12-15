import {
  ZOHO_ACCESSTOKEN_FAILURE,
  ZOHO_ACCESSTOKEN_SUCCESS,
  ZOHO_ACCESSTOKEN_REQUEST,
  ZOHO_TOKEN_AVAILABLE,
  ZOHO_REFRESHTOKEN_REQUEST,
  ZOHO_REFRESHTOKEN_SUCCESS,
  ZOHO_REFRESHTOKEN_FAILURE,
} from "../../constants/zohoToken.actionType";
export const TOKEN_FEATURE_KEY = "token";
let initialState = {
  loading: false,
  isAuthenticated: false,
  token: null,
  refresh_token: null,
  errorMessage: "",
  user: {},
};
let zohoTokenReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case ZOHO_ACCESSTOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ZOHO_ACCESSTOKEN_SUCCESS:
      localStorage.setItem("access_token", payload.access_token);
      return {
        ...state,
        loading: false,
        token: payload.access_token,
        isAuthenticated: true,
      };
    case ZOHO_ACCESSTOKEN_FAILURE:
      localStorage.removeItem("access_token");
      return {
        ...state,
        loading: false,
        errorMessage: payload,
        token: null,
        isAuthenticated: false,
      };
    case ZOHO_REFRESHTOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ZOHO_REFRESHTOKEN_SUCCESS:
      localStorage.setItem("refresh_token", payload.access_token);
      return {
        ...state,
        loading: false,
        refresh_token: payload.refresh_token,
        isAuthenticated: true,
      };
    case ZOHO_REFRESHTOKEN_FAILURE:
      localStorage.removeItem("refresh_token");
      return {
        ...state,
        loading: false,
        errorMessage: payload,
        refresh_token: null,
        isAuthenticated: false,
      };
    case ZOHO_TOKEN_AVAILABLE:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
};
export { zohoTokenReducer };
