import * as api from "../../services/questionServices";
import {
  FETCH_ALL_QUESTIONS,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  FETCH_NEW_QUESTIONS,
  FETCH_QUESTION_SEARCH,
  FETCH_FILTER_QUESTIONS,
  FETCH_TOTAL_QUESTIONS,
} from "../../constants/actionTypes";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () =>
  toast.success("Question created successfully", { autoClose: 1000 });
const deleteNotify = () =>
  toast.success("Question deleted successfully", { autoClose: 1000 });
const editNotify = () =>
  toast.success("Question edited successfully", { autoClose: 1000 });

export const getQuestions = (page) => async (dispatch) => {
  try {
    const {
      data: { data, currentPage, numberOfPages, Limit },
    } = await api.fetchQuestion(page);

    dispatch({
      type: FETCH_ALL_QUESTIONS,
      payload: { data, currentPage, numberOfPages, Limit },
    });
  } catch (error) {
    console.log(error);
  }
};
export const getFilterQuestions =
  (page, expirence, category) => async (dispatch) => {
    try {
      const {
        data: { data, currentPage, numberOfPages, Limit },
      } = await api.fetchFilterQuestions(page, expirence, category);

      dispatch({
        type: FETCH_FILTER_QUESTIONS,
        payload: { data, currentPage, numberOfPages, Limit },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getNewQuestions =
  (category, limit, employee_exp) => async (dispatch) => {
    try {
      const data = await api.fetchNewQuestion(category, limit, employee_exp);

      dispatch({ type: FETCH_NEW_QUESTIONS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getTotalQuestions = (category) => async (dispatch) => {
  try {
    const data = await api.fetchTotalQuestion(category);
    dispatch({ type: FETCH_TOTAL_QUESTIONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createQuestion = (question, setAddModel) => async (dispatch) => {
  try {
    const { data } = await api.createQuestion(question);
    dispatch({ type: CREATE_QUESTION, payload: data });
    dispatch(getQuestions());
    setAddModel(false);
    notify();
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = (question, id) => async (dispatch) => {
  try {
    const { data } = await api.updateQuestion(question, id);
    dispatch({ type: UPDATE_QUESTION, payload: data });
    editNotify();
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    await api.deleteQuestion(id);
    dispatch({ type: DELETE_QUESTION, payload: id });
    deleteNotify();
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionBySearch = (searchQuery) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.fetchQuestionBySearch(searchQuery);
    dispatch({ type: FETCH_QUESTION_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};
