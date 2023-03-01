import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_SWAGGER;

export const searchEmployees = (searchDto) => {
  return axios.post(API_PATH + "/employees/search", searchDto);
};

export const createNewEmployee = (employeeData) => {
  return axios.post(API_PATH + "/employees", employeeData);
};

export const editEmployeeById = (employeeData, employeeId) => {
  return axios.put(API_PATH + `/employees/${employeeId}`, employeeData);
};

export const deleteEmployeeById = (employeeId) => {
  return axios.delete(API_PATH + `/employees/${employeeId}`);
};

export const addDiploma = (diplomaData) => {
  return axios.post(API_PATH + "/diplomas", diplomaData);
};
