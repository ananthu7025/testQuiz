import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:3333/api/employees" });
export const createEmployee = (newEmployee) => API.post("/create", newEmployee);
export const fetchEmployees = (page) => API.get(`/get/all?page=${page}`);
export const fetchTotalEmployees = (category) =>
  API.get(`/total/emp?category=${category}`);
export const fetchEmployeesBySearch = (searchQuery) =>
  API.get(`/search?searchQuery=${searchQuery.search || "none"}`);
export const updateEmployee = (id, updatedemployee) =>
  API.post(`/edit/${id}`, updatedemployee);
export const deleteEmployee = (id) => API.delete(`/delete/${id}`);
export const getEmpById = (id) => API.get(`/getById/${id}`);
