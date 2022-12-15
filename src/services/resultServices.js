import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:3333/api/useranswer" });
export const createResult = (newResult) => API.post("/create", newResult);
export const fetchResult = (page) => API.get(`/get?page=${page}`);
export const fetchResultBySearch = (searchQuery) =>
  API.get(`/search?searchQuery=${searchQuery.search || "none"}`);
  export const fetchTotalRes = () => API.get("/get/total");
