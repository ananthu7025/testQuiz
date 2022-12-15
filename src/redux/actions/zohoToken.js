import {
  ZOHO_ACCESSTOKEN_REQUEST,
  ZOHO_ACCESSTOKEN_SUCCESS,
  ZOHO_ACCESSTOKEN_FAILURE,
  ZOHO_TOKEN_AVAILABLE,
  ZOHO_REFRESHTOKEN_REQUEST,
  ZOHO_REFRESHTOKEN_SUCCESS,
  ZOHO_REFRESHTOKEN_FAILURE,
} from "../../constants/zohoToken.actionType";
import Axios from "axios";
import { LOGIN_URL } from "../../generalConfig";
let generateAccessToken = (accessTokenUrl, data, pathname, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ZOHO_ACCESSTOKEN_REQUEST });
      let config = {
        method: "post",
        url: accessTokenUrl,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      let response = await Axios(config);
      if (
        response.data.error == "invalid_code" &&
        pathname.split("/")[1] !== "quizTest"
      ) {
        window.location = LOGIN_URL;
      }

      dispatch({ type: ZOHO_ACCESSTOKEN_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ZOHO_ACCESSTOKEN_FAILURE, payload: error });
    }
  };
};

let generateRefreshToken = (accessTokenUrl, refreshTokenData, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ZOHO_REFRESHTOKEN_REQUEST });
      let refreshConfig = {
        method: "post",
        url: accessTokenUrl,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: refreshTokenData,
      };

      let response = await Axios(refreshConfig);
      alert(JSON.stringify(response.data));
      dispatch({ type: ZOHO_REFRESHTOKEN_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ZOHO_REFRESHTOKEN_FAILURE, payload: error });
    }
  };
};

const tokenAvailable = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ZOHO_TOKEN_AVAILABLE });
    } catch (error) {
      console.log(error);
      dispatch({ type: ZOHO_ACCESSTOKEN_FAILURE, payload: error });
      alert("available_access");
    }
  };
};

let Logout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ZOHO_ACCESSTOKEN_FAILURE, payload: null });
      window.location = LOGIN_URL;
    } catch (error) {
      console.log(error);
    }
  };
};

export { generateAccessToken, tokenAvailable, generateRefreshToken, Logout };
