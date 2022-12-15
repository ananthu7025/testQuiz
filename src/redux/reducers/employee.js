import {
  FETCH_ALL,
  FETCH_TOTAL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  FETCH_EMP_ID,
} from "../../constants/actionTypes";

export default (state = { employees: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        employees: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        Limit: action.payload.Limit,
      };

    case FETCH_TOTAL:
      return {
        ...state,
        employees: action.payload,
      };

    case FETCH_BY_SEARCH:
      return {
        ...state,
        employees: action.payload,
      };

    case FETCH_EMP_ID:
      return {
        ...state,
        employees: action.payload,
      };

    case CREATE:
      return {
        ...state,
        error: action.payload.error,
        message: action.payload.message,
        employees: [...state.employees, action.payload],
      };

    case UPDATE:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee._id === action.payload._id ? action.payload : employee
        ),
      };

    case DELETE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
