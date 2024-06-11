import api from "./httpcommon";

const loginUser = (data) => api.post("login", data);

const authServices = {
  loginUser,
};

export default authServices;
