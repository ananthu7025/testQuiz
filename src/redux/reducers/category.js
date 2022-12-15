export default (state = { category: [] }, action) => {
  switch (action.type) {
    case "GET_CATEGORY_REQUEST":
      return { ...state, isLoading: true };
    case "GET_CATEGORY_SUCCESS":
      return { ...state, isLoading: false, category: action.payload };
    case "GET_CATEGORY_FAILURE":
      return { ...state, Error: true, isLoading: false };
    default:
      return state;
  }
};
