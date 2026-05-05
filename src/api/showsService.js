import api from "./interceptor";

export const fetchShows = () => {
  return api.get("/shows");
};

export const searchShows = (query) => {
  return api.get(`/search/shows?q=${query}`);
};

export const getShowDetails = (id) => {
  return api.get(`/shows/${id}`);
};