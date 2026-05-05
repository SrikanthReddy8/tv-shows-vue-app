import axios from "axios";

const api = axios.create({
  baseURL: "https://api.tvmaze.com",
});

export const fetchShows = () => api.get("/shows").then(res => res.data);

export const searchShows = (query) =>
  api.get(`/search/shows?q=${query}`).then(res => res.data);

export const getShowDetails = (id) =>
  api.get(`/shows/${id}`).then(res => res.data);