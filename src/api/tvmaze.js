import axios from "axios";

const api = axios.create({
  baseURL: "https://api.tvmaze.com",
});

export const fetchShows = async () => {
  const response = await api.get("/shows");
  return response.data;
};