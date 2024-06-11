import axios from "axios";

const Url =
  "http://13.53.236.127:3333/";

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
