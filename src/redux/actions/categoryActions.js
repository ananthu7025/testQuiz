const GET_CATEGORY_REQUEST = "GET_CATEGORY_REQUEST";
const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS";
const GET_CATEGORY_FAILURE = "GET_CATEGORY_FAILURE";

export const getCategoryRequest = () => {
  return {
    type: GET_CATEGORY_REQUEST,
  };
};

export const getCategorySuccess = (data) => {
  return {
    type: GET_CATEGORY_SUCCESS,
    payload: data,
  };
};

export const getCategoryFailure = () => {
  return {
    type: GET_CATEGORY_FAILURE,
  };
};
