import axios from "axios";

const Url =
  "https://6667e5b1fd88b7ac5b6ffa7e--charming-faloodeh-300d60.netlify.app/";

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
