import * as api from "../../services/resultServices";
import {
  FETCH_ALL_RESULTS,
  CREATE_RESULT,
  FETCH_RESULT_SEARCH,
  FETCH_TOTAL_RES,
} from "../../constants/actionTypes";

export const getResults = (page) => async (dispatch) => {
  try {
    const {
      data: { data, currentPage, numberOfPages, Limit },
    } = await api.fetchResult(page);

    dispatch({
      type: FETCH_ALL_RESULTS,
      payload: { data, currentPage, numberOfPages, Limit },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createResult = (result) => async (dispatch) => {
  try {
    const { data } = await api.createResult(result);
    dispatch({ type: CREATE_RESULT, payload: data });
    dispatch(getResults());
  } catch (error) {
    console.log(error);
  }
};

export const getResultBySearch = (searchQuery) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.fetchResultBySearch(searchQuery);
    dispatch({ type: FETCH_RESULT_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getTotalRes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTotalRes();
    dispatch({ type: FETCH_TOTAL_RES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
