import http from "../http-common";

const getAll = (params) => {
  return http.get("/categories", { params });
};

const get = (id) => {
  return http.get(`/categories/getById/${id}`);
};

const create = (data) => {
  return http.post("/categories/create", data);
};

const update = (id, data) => {
  return http.post(`/categories/edit/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/categories/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/categories`);
};

const findByCategory = (category) => {
  return http.get(`/categories?q=${category}`);
};

const CategoryService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByCategory,
};

export default CategoryService;
