import { combineReducers } from "redux";
import employees from "./employee";
import category from "./category";
import questions from "./questions";
import results from "./results";
import { TOKEN_FEATURE_KEY, zohoTokenReducer } from "./zohoTokenReducer";


export const reducers = combineReducers({
  employees,
  category,
  questions,
  results,
  [TOKEN_FEATURE_KEY]: zohoTokenReducer,
});
