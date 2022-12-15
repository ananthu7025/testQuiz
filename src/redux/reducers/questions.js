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

export default (state = { questions: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_QUESTIONS:
      return {
        ...state,
        questions: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        Limit: action.payload.Limit,
      };
    case FETCH_NEW_QUESTIONS:
      return {
        ...state,
        questions: action.payload.data,
      };
    case FETCH_TOTAL_QUESTIONS:
      return {
        ...state,
        questions: action.payload.data,
      };
    case FETCH_FILTER_QUESTIONS:
      return {
        ...state,
        questions: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        Limit: action.payload.Limit,
      };
    case CREATE_QUESTION:
      return { ...state, questions: [...state.questions, action.payload] };

    case UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map((question) =>
          question._id === action.payload._id ? action.payload : question
        ),
      };

    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question._id !== action.payload
        ),
      };
    case FETCH_QUESTION_SEARCH:
      return {
        ...state,
        questions: action.payload,
      };
    default:
      return state;
  }
};
