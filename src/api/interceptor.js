import axios from "axios";
import { useUIStore } from "@/stores/uiStore";

const api = axios.create({
  baseURL: "https://api.tvmaze.com",
});

api.interceptors.request.use((config) => {
  const uiStore = useUIStore();
  uiStore.startLoading();
  return config;
});

api.interceptors.response.use(
  (response) => {
    const uiStore = useUIStore();
    uiStore.stopLoading();
    return response.data;
  },
  (error) => {
    const uiStore = useUIStore();
    uiStore.stopLoading();
    return Promise.reject(error);
  }
);

export default api;