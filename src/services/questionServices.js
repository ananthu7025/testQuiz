import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:3333/questions" });
export const createQuestion = (newQuestion) => API.post("/create", newQuestion);
export const fetchQuestion = (page) => API.get(`/get?page=${page}`);
export const fetchFilterQuestions = (page, exiperence, category) =>
  API.get(`/filter?category=${category}&expirence=${exiperence}&page=${page}`);
export const fetchQuestionBySearch = (searchQuery) =>
  API.get(`/search?searchQuery=${searchQuery.search || "none"}`);
export const updateQuestion = (questionId, updatedQuestion) =>
  API.post(`edit/${questionId}`, updatedQuestion);
export const deleteQuestion = (id) => API.delete(`/delete/${id}`);
export const fetchNewQuestion = (category, limit, employee_exp) =>
  API.get(`?category=${category}&limit=${limit}&expirence=${employee_exp}`);
export const fetchTotalQuestion = () => API.get(`/total/que`);
