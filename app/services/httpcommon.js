import axios from "axios";

const Url = "https://f52zjf4r-3333.inc1.devtunnels.ms/";

const api = axios.create({
  baseURL: Url,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
