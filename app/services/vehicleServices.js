import api from "./httpcommon";

const createVehicle = (data) => api.post("createVehicle", data);
const getVehicle = (data) => api.get("getVehicles", data);

const vehicleServices = {
  createVehicle,
  getVehicle,
};

export default vehicleServices;
