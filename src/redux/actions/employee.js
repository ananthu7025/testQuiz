import * as api from "../../services";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  FETCH_TOTAL,
  FETCH_EMP_ID,
} from "../../constants/actionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = () =>
  toast.success("employee created successfully", { autoClose: 2000 });
const errorNotify = () =>
  toast.warning("employee alredy exists", { autoClose: 2000 });
const deleteNotify = () =>
  toast.success("employee deleted successfully", { autoClose: 2000 });
const editNotify = () =>
  toast.success("employee edited successfully", { autoClose: 2000 });

export const getEmployees = (page) => async (dispatch) => {
  try {
    const {
      data: { data, currentPage, numberOfPages, Limit },
    } = await api.fetchEmployees(page);

    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages, Limit },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEmpByIds = (id) => async (dispatch) => {
  try {
    const { data } = await api.getEmpById(id);
    dispatch({ type: FETCH_EMP_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getTotalEmployees = (category) => async (dispatch) => {
  try {
    const { data } = await api.fetchTotalEmployees(category);
    dispatch({ type: FETCH_TOTAL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeesBySearch = (searchQuery) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.fetchEmployeesBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createEmployee = (employee, setAddModel) => async (dispatch) => {
  try {
    const {
      data: { data, error, message },
    } = await api.createEmployee(employee);
    dispatch({ type: CREATE, payload: { error, message, data } });
    dispatch(getEmployees());
    if (error === false) {
      setAddModel(false);
      notify();
    } else {
      errorNotify();
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = (employee, id) => async (dispatch) => {
  try {
    const { data } = await api.updateEmployee(employee, id);
    dispatch({ type: UPDATE, payload: data });
    editNotify();
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    await api.deleteEmployee(id);
    dispatch({ type: DELETE, payload: id });
    dispatch(getEmployees());
    deleteNotify();
  } catch (error) {
    console.log(error);
  }
};
