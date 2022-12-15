import {
  FETCH_ALL_RESULTS,
  CREATE_RESULT,
  FETCH_RESULT_SEARCH,
  FETCH_TOTAL_RES,
} from "../../constants/actionTypes";

export default (state = { results: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_RESULTS:
      return {
        ...state,
        results: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        Limit: action.payload.Limit,
      };

    case FETCH_TOTAL_RES:
      return {
        ...state,
        results: action.payload.data,
      };

    case CREATE_RESULT:
      return { ...state, results: [...state.results, action.payload] };

    case FETCH_RESULT_SEARCH:
      return {
        ...state,
        results: action.payload,
      };

    default:
      return state;
  }
};
